import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, MapPin, ShieldCheck, Truck, Zap } from "lucide-react";
import { BuyerHeader } from "@/components/buyer/BuyerHeader";
import { BuyerFooter } from "@/components/buyer/BuyerFooter";
import { OrderSummary } from "@/components/buyer/OrderSummary";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockBuyer, logisticsProviders, formatNaira } from "@/lib/buyerMock";
import { cn } from "@/lib/utils";

const featured = logisticsProviders.slice(0, 2);
const others = logisticsProviders.slice(3);

const BuyerShipping = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [selected, setSelected] = useState("cheinly");
  const provider = logisticsProviders.find((p) => p.id === selected)!;
  const productId = params.get("productId") ?? "MD-9521X";
  const entry = params.get("entry");
  const mode = params.get("mode") ?? "guest";

  useEffect(() => {
    if (entry !== "secure-checkout") {
      navigate(`/buyer/product?productId=${encodeURIComponent(productId)}`, { replace: true });
    }
  }, [entry, navigate, productId]);

  const handleProceed = () => {
    const nextParams = new URLSearchParams({
      productId,
      entry: "secure-checkout",
      mode,
      provider: provider.id,
    });

    navigate(`/buyer/payment?${nextParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background bg-hero flex flex-col">
      <BuyerHeader variant="checkout" />
      <main className="flex-1 mx-auto w-full max-w-7xl px-5 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-8">
            <header>
              <h1 className="font-display text-4xl text-foreground">Shipping Details</h1>
              <p className="text-muted-foreground text-sm mt-1">Choose where your order goes and how it gets there.</p>
            </header>

            <Card className="shadow-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Delivery Address</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mockBuyer.name} · {mockBuyer.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">{mockBuyer.address}</p>
                </div>
                <button className="text-sm text-gold hover:underline">Change</button>
              </CardContent>
            </Card>

            <section className="space-y-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Recommended: Cheinly In-house</p>
                <h2 className="font-display text-2xl text-foreground mt-1">Choose Logistics Provider</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {featured.map((p) => (
                  <ProviderCard key={p.id} provider={p} active={selected === p.id} onClick={() => setSelected(p.id)} highlight />
                ))}
              </div>

              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground pt-4">Other Providers</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {others.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all",
                      selected === p.id ? "border-gold bg-gold/10" : "border-border hover:border-gold/50 bg-card",
                    )}
                  >
                    <p className="font-display text-lg text-gold">{p.name}</p>
                    <p className="text-foreground font-semibold mt-1">{formatNaira(p.price)}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.eta}</p>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <OrderSummary
            shippingFee={provider.price}
            ctaSlot={
              <Button
                onClick={handleProceed}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mt-2"
              >
                Proceed to Payment <ArrowRight className="h-4 w-4" />
              </Button>
            }
            noteSlot={<p className="text-[11px] text-muted-foreground text-center">By continuing, you agree to our Terms of Sale</p>}
          />
        </div>
      </main>
      <BuyerFooter variant="checkout" />
    </div>
  );
};

const ProviderCard = ({
  provider,
  active,
  onClick,
  highlight,
}: {
  provider: typeof logisticsProviders[number];
  active: boolean;
  onClick: () => void;
  highlight?: boolean;
}) => {
  const Icon = provider.id === "cheinly" ? Truck : Zap;
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-xl border p-5 text-left transition-all",
        active ? "border-gold bg-gold/10 shadow-glow" : "border-border bg-card hover:border-gold/40",
      )}
    >
      {highlight && provider.recommended && (
        <span className="absolute -top-2 left-4 bg-gold text-gold-foreground text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md">
          Fastest Delivery
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", active ? "bg-gold/20" : "bg-secondary")}>
          <Icon className={cn("h-5 w-5", active ? "text-gold" : "text-primary")} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-foreground">{provider.name}</p>
            <p className="font-semibold text-foreground whitespace-nowrap">{formatNaira(provider.price)}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{provider.eta}</p>
          {provider.note && <p className="text-xs text-primary mt-0.5">{provider.note}</p>}
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 text-[11px] text-success">
        <ShieldCheck className="h-3 w-3" /> PROTECTED BALANCE ENABLED
      </div>
    </button>
  );
};

export default BuyerShipping;