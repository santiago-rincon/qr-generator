export const ErrorSpan = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="block text-start py-1 ms-2 font-bold text-red-500">
      {children}
    </span>
  );
};
