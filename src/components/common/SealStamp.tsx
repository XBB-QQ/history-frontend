interface SealStampProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SealStamp({ text = '史', size = 'md', className = '' }: SealStampProps) {
  const sizeClasses = {
    sm: 'text-lg w-10 h-10',
    md: 'text-2xl w-14 h-14',
    lg: 'text-4xl w-20 h-20',
  };

  return (
    <div
      className={`seal-stamp inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      {text}
    </div>
  );
}
