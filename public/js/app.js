const API_URL = '/api/project/default';

async function loadProjectData() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.ok) {
            renderProject(result.data);
        } else {
            console.error('Server error:', result.error);
        }
    } catch (error) {
        console.error('Connection error:', error);
    }
}

function renderProject(data) {
    document.getElementById('project-title').textContent = data.plan.title || 'New Project';
    document.getElementById('total-budget').textContent = `${data.plan.total_budget || 0} €`;

    const tasksContainer = document.getElementById('tasks-container');
    tasksContainer.innerHTML = ''; 

    if (!data.tasks || data.tasks.length === 0) {
        tasksContainer.innerHTML = '<p class="text-sm text-white/40 text-center py-8">No active tasks.</p>';
        return;
    }

    data.tasks.forEach(task => {
        const isDone = task.done;
        
        const taskEl = document.createElement('div');
        // Dark theme glasses classes matching the outer container
        taskEl.className = `flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 transition-all duration-300 ${isDone ? 'opacity-40 grayscale' : 'hover:bg-white/10 hover:border-white/10 shadow-lg shadow-black/20'}`;
        
        taskEl.innerHTML = `
            <div class="flex items-center space-x-4 mb-3 sm:mb-0">
                <div class="relative flex items-center justify-center">
                    <input type="checkbox" id="task-${task.id}" ${isDone ? 'checked' : ''} 
                           class="w-6 h-6 appearance-none border-2 border-white/20 rounded-md checked:bg-[#64CEFB] checked:border-[#64CEFB] focus:outline-none transition-colors cursor-pointer peer"
                           onchange="toggleTask('${task.id}', this.checked)">
                    <svg class="absolute w-4 h-4 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <label for="task-${task.id}" class="text-base font-medium ${isDone ? 'text-white/40 line-through' : 'text-white/90'} cursor-pointer select-none">
                    ${task.title || 'Unnamed task'}
                </label>
            </div>
            ${task.cost > 0 ? `<span class="inline-flex items-center self-start sm:self-auto px-3 py-1.5 bg-[#64CEFB]/10 text-[#64CEFB] text-sm font-semibold rounded-lg border border-[#64CEFB]/20">${task.cost} €</span>` : ''}
        `;
        
        tasksContainer.appendChild(taskEl);
    });
}

async function toggleTask(taskId, isDone) {
    try {
        const response = await fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: isDone })
        });
        
        const result = await response.json();
        if (result.ok) {
            loadProjectData();
        }
    } catch (error) {
        console.error('Task update error:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadProjectData);
