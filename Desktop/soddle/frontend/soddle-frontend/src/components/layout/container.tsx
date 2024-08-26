export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto sm:max-w-[500px]  w-full ${className}`}>
      {children}
    </div>
  );
}
