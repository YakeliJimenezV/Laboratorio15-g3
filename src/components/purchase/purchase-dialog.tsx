import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";

import type { MovieDetail } from "@/types/movie";
import { formatCurrency, getTicketPrice } from "@/lib/pricing";
import { usePurchasesStore } from "@/store/use-purchases-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  movie: MovieDetail;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = "form" | "processing" | "success";

const initialForm = {
  buyerName: "",
  buyerEmail: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export function PurchaseDialog({ movie, open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState(initialForm);
  const addPurchase = usePurchasesStore((state) => state.addPurchase);

  const price = getTicketPrice(movie.id);

  const handleChange =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const isFormValid =
    form.buyerName.trim().length > 0 &&
    form.buyerEmail.trim().length > 0 &&
    form.cardNumber.replace(/\s/g, "").length >= 16 &&
    form.expiry.trim().length >= 4 &&
    form.cvv.trim().length >= 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStep("processing");

    // Simulación de procesamiento de pago
    setTimeout(() => {
      addPurchase({
        ticketId: crypto.randomUUID(),
        movieId: movie.id,
        movieTitle: movie.title,
        posterPath: movie.poster_path,
        price,
        buyerName: form.buyerName,
        buyerEmail: form.buyerEmail,
        purchasedAt: new Date().toISOString(),
      });
      setStep("success");
    }, 1500);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      // Reset al cerrar
      setStep("form");
      setForm(initialForm);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle>Comprar entrada</DialogTitle>
              <DialogDescription>
                {movie.title} · {formatCurrency(price)}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="buyerName">
                  Nombre completo
                </label>
                <Input
                  id="buyerName"
                  placeholder="Yakeli Jimenez"
                  value={form.buyerName}
                  onChange={handleChange("buyerName")}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="buyerEmail">
                  Correo electrónico
                </label>
                <Input
                  id="buyerEmail"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={form.buyerEmail}
                  onChange={handleChange("buyerEmail")}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="cardNumber">
                  Número de tarjeta
                </label>
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  value={form.cardNumber}
                  onChange={handleChange("cardNumber")}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="expiry">
                    Vencimiento
                  </label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    maxLength={5}
                    value={form.expiry}
                    onChange={handleChange("expiry")}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="cvv">
                    CVV
                  </label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    maxLength={4}
                    value={form.cvv}
                    onChange={handleChange("cvv")}
                    required
                  />
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                Esto es una simulación académica. No se procesa ningún pago
                real ni se guarda información de tarjetas.
              </p>

              <DialogFooter>
                <Button type="submit" disabled={!isFormValid}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pagar {formatCurrency(price)}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Procesando tu pago...
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <DialogTitle>¡Compra exitosa!</DialogTitle>
            <DialogDescription>
              Tu entrada para <strong>{movie.title}</strong> fue confirmada.
              Te enviamos el comprobante a {form.buyerEmail}.
            </DialogDescription>
            <Button onClick={() => handleClose(false)} className="mt-2">
              Listo
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}