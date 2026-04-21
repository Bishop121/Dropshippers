import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProduct, formatNaira } from "@/lib/buyerMock";
import { ShieldCheck } from "lucide-react";

interface OrderSummaryProps {
  shippingFee?: number;
  platformFee?: number;
  showProtectedNote?: boolean;
  ctaSlot?: React.ReactNode;
  noteSlot?: React.ReactNode;
}

export const OrderSummary = ({
  shippingFee = 0,
  platformFee = 0,
  showProtectedNote = true,
  ctaSlot,
  noteSlot,
}: OrderSummaryProps) => {
  const subtotal = mockProduct.price;
  const total = subtotal + shippingFee + platformFee;

  return (
    <Card className="shadow-card sticky top-20">
      <CardHeader>
        <CardTitle className="font-display text-2xl text-foreground">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex gap-3">
          <img
            src={mockProduct.image}
            alt={mockProduct.name}
            className="h-16 w-16 rounded-md object-cover ring-1 ring-border"
            loading="lazy"
            width={64}
            height={64}
          />
          <div className="min-w-0">
            <p className="font-medium text-foreground text-sm leading-snug">{mockProduct.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{mockProduct.subtitle}</p>
            <p className="text-gold font-semibold text-sm mt-1">{formatNaira(mockProduct.price)}</p>
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2 text-sm">
          <Row label="Subtotal" value={formatNaira(subtotal)} />
          <Row label="Shipping Fee" value={shippingFee ? formatNaira(shippingFee) : "—"} />
          <Row label="Platform Fee" value={platformFee ? formatNaira(platformFee) : "₦0.00"} />
        </div>

        <div className="border-t border-border pt-4 flex items-center justify-between">
          <span className="font-display text-lg text-foreground">Total Amount</span>
          <span className="font-display text-2xl text-gold">{formatNaira(total)}</span>
        </div>

        {showProtectedNote && (
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-xs text-foreground/80 flex gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              Your payment is secured by <span className="text-primary font-medium">Cheinly Escrow</span>. Funds are only released when you confirm delivery.
            </span>
          </div>
        )}

        {noteSlot}
        {ctaSlot}
      </CardContent>
    </Card>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);