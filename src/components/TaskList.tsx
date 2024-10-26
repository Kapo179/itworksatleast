import { CheckCircle2, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: string[];
  completedTasks: number[];
  onToggleTask: (index: number) => void;
}

export function TaskList({ tasks, completedTasks, onToggleTask }: TaskListProps) {
  return (
    <div className="bg-black/40 rounded-xl p-4 border border-[#00ff00]/10">
      {tasks.map((task, index) => (
        <div 
          key={index}
          onClick={() => onToggleTask(index)}
          className="flex items-center space-x-3 py-2 cursor-pointer group"
        >
          {completedTasks.includes(index) ? (
            <CheckCircle2 className="text-[#00ff00] transition-all duration-300" size={20} />
          ) : (
            <Circle className="text-gray-400 group-hover:text-[#00ff00]/50 transition-all duration-300" size={20} />
          )}
          <span className={`text-sm ${completedTasks.includes(index) ? 'text-[#00ff00]' : 'text-gray-300'}`}>
            {task}
          </span>
        </div>
      ))}
    </div>
  );
}