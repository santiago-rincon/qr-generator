export const ErrorSpan = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`block text-start py-1 ms-2 font-bold text-red-500 ${className}`}
    >
      {children}
    </span>
  );
};
