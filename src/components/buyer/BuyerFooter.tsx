export const BuyerFooter = ({ variant = "checkout" }: { variant?: "checkout" | "dashboard" }) => (
  <footer className="border-t border-border/60 mt-16">
    <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} Cheinly Platform. {variant === "checkout" ? "Secure Escrow Checkout." : "All rights reserved."}</p>
      <div className="flex items-center gap-5">
        <a href="#" className="hover:text-gold transition-colors">Terms</a>
        <a href="#" className="hover:text-gold transition-colors">Privacy</a>
        <a href="#" className="hover:text-gold transition-colors">Help Center</a>
      </div>
    </div>
  </footer>
);