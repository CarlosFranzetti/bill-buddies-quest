import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: number;
}

interface WelcomeOnboardingProps {
  onComplete: (bills: Bill[]) => void;
}

export const WelcomeOnboarding = ({ onComplete }: WelcomeOnboardingProps) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [currentBill, setCurrentBill] = useState({
    name: "",
    amount: "",
    dueDate: "",
  });

  const handleAddBill = () => {
    if (!currentBill.name.trim()) {
      toast.error("Please enter a bill name!");
      return;
    }
    if (!currentBill.amount || parseFloat(currentBill.amount) <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }
    if (!currentBill.dueDate) {
      toast.error("Please select a due date!");
      return;
    }

    const newBill: Bill = {
      id: Date.now().toString(),
      name: currentBill.name.trim(),
      amount: parseFloat(currentBill.amount),
      dueDate: currentBill.dueDate,
      paid: 0,
    };

    setBills([...bills, newBill]);
    setCurrentBill({ name: "", amount: "", dueDate: "" });
    toast.success(`${newBill.name} added!`);
  };

  const handleRemoveBill = (id: string) => {
    setBills(bills.filter((bill) => bill.id !== id));
  };

  const handleFinish = () => {
    if (bills.length === 0) {
      toast.error("Add at least one bill to get started!");
      return;
    }
    onComplete(bills);
    toast.success("Let's start saving! 🎮");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 md:p-8 border-4">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl text-primary">
              💰 Welcome to BillSaver!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Let's get started! Tell me about your monthly bills and I'll help you save for them daily. 
              <span className="block mt-2">It's like a game - save daily, earn achievements, and level up! 🎮</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="billName" className="text-sm">Bill Name</Label>
                <Input
                  id="billName"
                  placeholder="e.g., Rent, Electric, Internet"
                  value={currentBill.name}
                  onChange={(e) =>
                    setCurrentBill({ ...currentBill, name: e.target.value })
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleAddBill()}
                  className="mt-1"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-sm">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={currentBill.amount}
                    onChange={(e) =>
                      setCurrentBill({ ...currentBill, amount: e.target.value })
                    }
                    onKeyPress={(e) => e.key === "Enter" && handleAddBill()}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate" className="text-sm">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={currentBill.dueDate}
                    onChange={(e) =>
                      setCurrentBill({ ...currentBill, dueDate: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleAddBill}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Bill
              </Button>
            </div>

            {bills.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Your Bills:</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {bills.map((bill) => (
                    <Card key={bill.id} className="p-3 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{bill.name}</p>
                        <p className="text-xs text-muted-foreground">
                          ${bill.amount.toFixed(2)} • Due {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveBill(bill.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </Card>
                  ))}
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm font-semibold">
                    Total Monthly: ${bills.reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Daily Goal: ${(bills.reduce((sum, b) => sum + b.amount, 0) / 30).toFixed(2)}
                  </p>
                </div>
              </div>
            )}

            {bills.length > 0 && (
              <Button
                onClick={handleFinish}
                className="w-full h-12 text-lg"
              >
                Start Saving!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
