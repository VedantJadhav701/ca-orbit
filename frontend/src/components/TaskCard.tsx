import React from "react";
import { CheckCircle, Circle, Clock } from "lucide-react";

interface TaskCardProps {
  title: string;
  subject: string;
  timeEstimate: string;
  completed: boolean;
  onToggle: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  title, 
  subject, 
  timeEstimate, 
  completed, 
  onToggle 
}) => {
  return (
    <div className={`neo-card flex items-center justify-between p-4 ${completed ? "bg-zinc-200 opacity-60" : "bg-white"}`}>
      <div className="flex items-center space-x-4">
        <button onClick={onToggle} className="text-black hover:text-secondary transition-colors">
          {completed ? <CheckCircle className="w-8 h-8 fill-secondary text-black" /> : <Circle className="w-8 h-8" />}
        </button>
        <div>
          <h4 className={`text-2xl font-heading ${completed ? "line-through" : ""}`}>{title}</h4>
          <p className="font-body text-lg text-black/60 uppercase tracking-widest">{subject}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 font-heading text-xl">
        <Clock className="w-6 h-6" />
        <span>{timeEstimate}</span>
      </div>
    </div>
  );
};
