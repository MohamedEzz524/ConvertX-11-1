const Announcement = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text bg-textPrimary color-bgPrimary fixed top-0 left-0 z-20 w-full py-1 text-center text-[13px] uppercase sm:text-sm">
      {children}
    </div>
  );
};

export default Announcement;
