import { useState } from 'react';
import ResetModal from '../ResetModal';
import { Button } from '@/components/ui/button';

export default function ResetModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Button onClick={() => setOpen(true)}>Open Reset Modal</Button>
      <ResetModal 
        open={open}
        onOpenChange={setOpen}
        onReset={(promise) => console.log('Reset with promise:', promise)}
      />
    </div>
  );
}
