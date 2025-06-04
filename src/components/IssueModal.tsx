import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface IssueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IssueModal({ open, onOpenChange }: IssueModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 shadow-md p-10 border border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Problemas?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Com problemas ao editar seu tema? Abra uma Issue no Github informando todos os detalhes, se possível um vídeo detalhando o problema.
        </DialogDescription>
        <button
          onClick={() => window.open('https://github.com/leufrasiojunior/hydra-theme-builder/issues', '_blank')}
          className="w-full py-2 rounded bg-blue-600 text-white"
        >
          Abrir Issue
        </button>
      </DialogContent>
    </Dialog>
  );
}
