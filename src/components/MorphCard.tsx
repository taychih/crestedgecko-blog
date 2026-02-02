
import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface MorphCardProps {
  image: string;
  name: string;
  features: string[];
}

const MorphCard: React.FC<MorphCardProps> = ({ image, name, features }) => {
  return (
    <div className="group bg-white border border-moss-light/20 rounded-global overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="serif text-xl font-bold text-moss-dark flex items-center gap-2">
          {name}
          <Sparkles size={16} className="text-gecko" />
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {features.map((feature, idx) => (
            <span 
              key={idx} 
              className="text-[10px] font-mono uppercase tracking-wider text-moss-light bg-cream-dark px-2 py-0.5 rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 py-3 border border-earth text-moss-dark hover:bg-moss hover:text-white transition-all rounded-global text-xs font-bold uppercase tracking-widest">
          <Info size={14} />
          查看详细特征
        </button>
      </div>
    </div>
  );
};

export default MorphCard;
