import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const FirstTimeAlert = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("first-time-alert-seen");
    if (!hasSeenAlert) {
      setOpen(true);
      localStorage.setItem("first-time-alert-seen", "true");
    }
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Notice</AlertDialogTitle>
          <AlertDialogDescription>
            This project is deployed on Render. The server may take 1 to 3
            minutes to respond on the first load due to cold starts. Thank you
            for your patience.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => setOpen(false)}
            className="text-white"
          >
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FirstTimeAlert;
