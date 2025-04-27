import Link from 'next/link';
import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { trpc } from '@/app/_trpc/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface IProps {
  isAdminView?: boolean;
  application: IApplication;
}

export default function DashboardApplicationCard({
  isAdminView,
  application,
}: IProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const utils = trpc.useContext();

  const deleteApplication = trpc.application.delete.useMutation({
    onSuccess: () => {
      // Invalidate the cache
      utils.application.getUserApplications.invalidate();

      // Reload the page after deletion
      window.location.reload();
    },
  });

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent navigating when clicking the delete button
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteApplication.mutate({ applicationId: application.id });
  };

  // Check if the mutation is in progress using the correct property
  const isDeleting = deleteApplication.isPending;

  return (
    <>
      <Link
        href={`/${isAdminView ? 'admin' : 'dashboard'}/applications/${
          application.id
        }`}
        className="relative p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl grid grid-cols-[80px_auto] items-center gap-6 hover:opacity-75 duration-200"
      >
        {/* Status Badges */}
        {application.status === 'REVIEWING' && (
          <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-yellow-100 rounded-full text-xs font-medium uppercase text-yellow-600 duration-200">
            Reviewing
          </p>
        )}
        {application.status === 'REJECTED' && (
          <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200">
            Rejected
          </p>
        )}
        {application.status === 'AWAITING_PAYMENT' && (
          <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-blue-100 rounded-full text-xs font-medium uppercase text-blue-600 duration-200">
            Awaiting Payment
          </p>
        )}
        {application.status === 'PAID' &&
          !application.uId &&
          !application.certificateImgUrl &&
          !application.expiresAt && (
            <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200">
              Paid
            </p>
          )}
        {!application.isBlocked &&
          application.status === 'PAID' &&
          application.uId &&
          application.certificateImgUrl &&
          application.expiresAt &&
          new Date(application.expiresAt) > new Date() && (
            <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200">
              Active
            </p>
          )}
        {!application.isBlocked &&
          application.status === 'PAID' &&
          application.uId &&
          application.certificateImgUrl &&
          application.expiresAt &&
          new Date(application.expiresAt) < new Date() && (
            <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200">
              Expired
            </p>
          )}
        {application.isBlocked &&
          application.status === 'PAID' &&
          application.uId &&
          application.certificateImgUrl &&
          application.expiresAt && (
            <p className="absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200">
              Blocked
            </p>
          )}

        {/* Business Logo */}
        <div className="aspect-square bg-secondary rounded-xl flex justify-center items-center">
          <img
            src={application.businessLogoUrl}
            alt=""
            width={60}
            height={60}
            className="object-cover rounded-lg"
          />
        </div>

        {/* Business Details */}
        <div className="space-y-1">
          <h3 className="flex items-center text-lg font-semibold">
            {application.businessName}&nbsp;&nbsp;&nbsp;
            <span className="hidden md:block text-sm font-[400] text-muted-foreground">
              —&nbsp;&nbsp;&nbsp;{application.businessSector}
            </span>
          </h3>
          <p className="flex text-sm text-muted-foreground">
            Badge no: {application.uId ? application.uId : 'N/A'}
            <span className="hidden md:block font-extralight">
              &nbsp;&nbsp;&nbsp;•
            </span>
            <span className="hidden md:block">
              &nbsp;&nbsp;&nbsp;{application.businessSize} employees
            </span>
          </p>
        </div>

        {/* Delete Icon Button */}
        <button
          onClick={handleDelete}
          className="absolute bottom-[10px] right-[10px] p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete application"
        >
          <Trash2 size={16} />
        </button>
      </Link>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this application for{' '}
              {application.businessName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
