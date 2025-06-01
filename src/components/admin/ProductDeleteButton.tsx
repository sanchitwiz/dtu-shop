// components/admin/ProductDeleteButton.tsx - Enhanced error handling
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ProductDeleteButtonProps {
  productId: string;
  productName: string;
}

export default function ProductDeleteButton({ productId, productName }: ProductDeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${productName}"? This action cannot be undone.`)) {
      return;
    }

    setIsDeleting(true);
    
    try {
      console.log('Deleting product:', productId); // Debug log
      
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Delete response status:', response.status); // Debug log
      console.log('Delete response headers:', response.headers.get('content-type')); // Debug log

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response:', textResponse);
        throw new Error('Server returned HTML instead of JSON. Check API route.');
      }

      const data = await response.json();

      if (response.ok) {
        toast.success('Product deleted successfully');
        router.refresh();
      } else {
        toast.error(data.error || 'Failed to delete product');
      }
    } catch (error: any) {
      console.error('Error deleting product:', error);
      
      if (error.message.includes('Unexpected token')) {
        toast.error('Server error: API route not found or returning HTML');
      } else {
        toast.error('An error occurred while deleting product');
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      size="sm" 
      variant="outline" 
      className="text-red-600 border-red-600 hover:bg-red-50"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
