import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  paid: number;
}

interface BillsListProps {
  bills: Bill[];
}

export const BillsList = ({ bills }: BillsListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Bills</h3>
      <div className="grid gap-3">
        {bills.map((bill) => {
          const progress = (bill.paid / bill.amount) * 100;
          return (
            <Card key={bill.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{bill.name}</h4>
                    <p className="text-sm text-muted-foreground">Due: {bill.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${bill.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">
                      ${bill.paid.toFixed(2)} saved
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {progress.toFixed(0)}% complete
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
