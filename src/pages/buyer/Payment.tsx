import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Copy, Info, Landmark, ShieldCheck } from "lucide-react";
import { BuyerHeader } from "@/components/buyer/BuyerHeader";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import { OrderSummary } from "@/components/buyer/OrderSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { mockProduct, formatNaira } from "@/lib/buyerMock";
import { toast } from "sonner";

const BuyerPayment = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const copyAccount = () => {
    navigator.clipboard.writeText(mockProduct.seller.account);
    toast.success("Account number copied");
  };

  return (
    <div className="min-h-screen bg-background bg-hero flex flex-col">
      <BuyerHeader variant="checkout" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-6">
            <header>
              <h1 className="font-display text-4xl text-foreground">Complete Your Purchase</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Please complete the bank transfer to secure your order and fund your Protected Balance.
              </p>
            </header>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-xl">
                  <Landmark className="h-5 w-5 text-gold" /> Seller's Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Bank Name" value={mockProduct.seller.bank} />
                  <Field label="Account Name" value={mockProduct.seller.name} />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Account Number</p>
                  <div className="flex items-center justify-between rounded-lg bg-secondary border border-border px-4 py-3">
                    <span className="font-mono text-lg text-foreground tracking-widest">{mockProduct.seller.account}</span>
                    <button onClick={copyAccount} className="flex items-center gap-1.5 text-sm text-gold hover:text-gold/80">
                      <Copy className="h-4 w-4" /> Copy
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 flex gap-3 text-sm">
                  <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground/80">
                    <span className="font-medium text-foreground">Instruction:</span> Transfer exactly{" "}
                    <span className="font-semibold text-gold">{formatNaira(mockProduct.price)}</span> to the account above to fund your Protected Balance.
                  </p>
                </div>

                <Button onClick={() => setOpen(true)} className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <ShieldCheck className="h-4 w-4" /> I Have Made the Payment
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Funds will be held in escrow by Cheinly and only released to the seller after you confirm receipt.
                </p>
              </CardContent>
            </Card>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Change Payment Method
            </button>
          </div>

          <OrderSummary shippingFee={2500} />
        </div>
      </main>
      <BuyerFooter variant="checkout" />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader className="items-center text-center space-y-3">
            <div className="h-14 w-14 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-success" />
            </div>
            <DialogTitle className="font-display text-2xl">Payment Awaiting Verification</DialogTitle>
            <DialogDescription>
              We have received your notification. Our system is verifying the transfer. Your funds will be moved to the{" "}
              <span className="text-primary font-medium">Protected Balance</span> once confirmed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 pt-2">
            <Button
              onClick={() => navigate("/buyer/dashboard")}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Go to Dashboard
            </Button>
            <button className="w-full text-sm text-muted-foreground hover:text-gold py-2">Contact Support</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

export default BuyerPayment;