/** Мягкое появление страницы при переходе между разделами */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
