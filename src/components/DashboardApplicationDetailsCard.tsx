import { Loader2, MapPin, Bolt, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/app/_trpc/client';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { pricing } from '@/lib/platform';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useUploadThing } from '@/lib/uploadthing';

interface IProps {
  isAdminView?: boolean;
  application: IApplication;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  refetchApplication?: () => void;
}

export default function DashboardApplicationDetailsCard({
  isAdminView,
  application,
  isLoading,
  setIsLoading,
  refetchApplication,
}: IProps) {
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isRejecting, setIsRejecting] = useState<boolean>(false);
  const [isAssigning, setIsAssigning] = useState<boolean>(false);
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const [isUnblocking, setIsUnblocking] = useState<boolean>(false);

  const [rejectionReason, setRejectionReason] = useState<string>('');

  const [uId, setUId] = useState<string>('');
  const [certificateImgFile, setCertificateImgFile] = useState<File[] | null>(
    null
  );
  const [certificateFile, setCertificateFile] = useState<File[] | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const { startUpload } = useUploadThing('mediaUploader', {
    onUploadError: () => {
      setIsAssigning(false);

      toast({
        variant: 'destructive',
        title:
          'Error uploading files, make sure you are only uploading images or pdfs',
      });
    },
  });

  const { mutate: createCheckoutSession } =
    trpc.application.createCheckoutSession.useMutation({
      onMutate: () => {
        setIsLoading(true);
      },
      onSettled: () => {
        setIsLoading(false);
      },
      onSuccess: (res) => {
        router.push(res ?? '');
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Unable to retrieve payment url',
        });
      },
    });

  const { mutate: approveApplication } = trpc.application.approve.useMutation({
    onMutate: () => {
      setIsApproving(true);
    },
    onSettled: () => {
      setIsApproving(false);
    },
    onSuccess: () => {
      refetchApplication && refetchApplication();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: err.message,
      });
    },
  });

  const { mutate: rejectApplication } = trpc.application.reject.useMutation({
    onMutate: () => {
      setIsRejecting(true);
    },
    onSettled: () => {
      setIsRejecting(false);
    },
    onSuccess: () => {
      setRejectionReason('');

      refetchApplication && refetchApplication();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: err.message,
      });
    },
  });

  const { mutate: assignApplicationCertificate } =
    trpc.application.assignCertificate.useMutation({
      onMutate: () => {
        setIsAssigning(true);
      },
      onSettled: () => {
        setIsAssigning(false);
      },
      onSuccess: () => {
        setUId('');
        setCertificateImgFile(null);
        setCertificateFile(null);

        refetchApplication && refetchApplication();
      },
      onError: (err) => {
        toast({
          variant: 'destructive',
          title: err.message,
        });
      },
    });

  const { mutate: blockApplication } = trpc.application.block.useMutation({
    onMutate: () => {
      setIsBlocking(true);
    },
    onSettled: () => {
      setIsBlocking(false);
    },
    onSuccess: () => {
      refetchApplication && refetchApplication();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: err.message,
      });
    },
  });

  const { mutate: unblockApplication } = trpc.application.unblock.useMutation({
    onMutate: () => {
      setIsUnblocking(true);
    },
    onSettled: () => {
      setIsUnblocking(false);
    },
    onSuccess: () => {
      refetchApplication && refetchApplication();
    },
    onError: (err) => {
      toast({
        variant: 'destructive',
        title: err.message,
      });
    },
  });

  const handleAssignApplicationCertificate = async () => {
    if (!isAssigning && certificateImgFile && certificateFile) {
      try {
        setIsAssigning(true);

        const certificateImgRes = await startUpload(certificateImgFile);
        const certificateImgUrl =
          certificateImgRes && certificateImgRes[0]
            ? certificateImgRes[0].url
            : '';

        const certificateFileRes = await startUpload(certificateFile);
        const certificateFileUrl =
          certificateFileRes && certificateFileRes[0]
            ? certificateFileRes[0].url
            : '';

        assignApplicationCertificate({
          applicationId: application.id,
          uId,
          certificateImgUrl,
          certificateFileUrl,
        });
      } catch (err) {
        setIsAssigning(false);

        toast({
          variant: 'destructive',
          title: 'Something went wrong',
        });
      }
    }
  };

  return (
    <div className="relative p-6 border border-secondary bg-white shadow-[5px_5px_25px_rgba(0,0,0,0.05)] rounded-2xl">
      {application.status === 'REVIEWING' && (
        <p
          className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-yellow-100 rounded-full text-xs font-medium uppercase text-yellow-600 duration-200`}
        >
          Reviewing
        </p>
      )}

      {application.status === 'REJECTED' && (
        <p
          className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200`}
        >
          Rejected
        </p>
      )}

      {application.status === 'AWAITING_PAYMENT' && (
        <p
          className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-blue-100 rounded-full text-xs font-medium uppercase text-blue-600 duration-200`}
        >
          Awaiting Payment
        </p>
      )}

      {application.status === 'PAID' &&
        !application.uId &&
        !application.certificateImgUrl &&
        !application.expiresAt && (
          <p
            className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200`}
          >
            Paid
          </p>
        )}

      {!application.isBlocked &&
        application.status === 'PAID' &&
        application.uId &&
        application.certificateImgUrl &&
        application.expiresAt &&
        new Date(application.expiresAt) > new Date() && (
          <p
            className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-green-100 rounded-full text-xs font-medium uppercase text-green-600 duration-200`}
          >
            Active
          </p>
        )}

      {!application.isBlocked &&
        application.status === 'PAID' &&
        application.uId &&
        application.certificateImgUrl &&
        application.expiresAt &&
        new Date(application.expiresAt) < new Date() && (
          <p
            className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200`}
          >
            Expired
          </p>
        )}

      {application.isBlocked &&
        application.status === 'PAID' &&
        application.uId &&
        application.certificateImgUrl &&
        application.expiresAt && (
          <p
            className={`absolute top-[10px] right-[10px] py-[3px] px-3 bg-red-100 rounded-full text-xs font-medium uppercase text-red-600 duration-200`}
          >
            Blocked
          </p>
        )}

      <div className="grid grid-cols-[80px_auto] items-center gap-6">
        <div className="aspect-square bg-secondary rounded-xl flex justify-center items-center">
          <img
            src={application.businessLogoUrl}
            alt=""
            width={60}
            height={60}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{application.businessName}</h3>

          <p className="text-sm text-muted-foreground">
            Badge no: {application.uId ? application.uId : 'N/A'}
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <Bolt className="w-5 h-5" />
          Sector:{' '}
          <span className="text-foreground">{application.businessSector}</span>
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-secondary space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <Users className="w-5 h-5" />
          Size:{' '}
          <span className="text-foreground">
            {application.businessSize} employees
          </span>
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-secondary space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <Phone className="w-5 h-5" />
          Contact info:
        </p>

        <p className="pl-[32px]">
          {application.contactName}, {application.contactEmail},{' '}
          {application.contactPhone}
        </p>
      </div>

      <div className="mt-5 pt-5 border-t border-secondary space-y-3">
        <p className="flex items-center gap-3 text-muted-foreground">
          <MapPin className="w-5 h-5" />
          Address:
        </p>

        <p className="pl-[32px]">{application.businessAddress}</p>
      </div>

      {!isAdminView && application.status === 'AWAITING_PAYMENT' && (
        <Button
          disabled={isLoading}
          onClick={() =>
            createCheckoutSession({ applicationId: application.id })
          }
          className="mt-12 w-full"
        >
          {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          Pay{' '}
          {
            pricing.find((p) => p.dbValue === application.businessSize)
              ?.priceString
          }
        </Button>
      )}

      {isAdminView && application.status === 'REVIEWING' && (
        <div className="mt-12">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={isApproving || isRejecting || isAssigning}
                className="w-full bg-green-600 hover:bg-green-600/90"
              >
                {isApproving && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Approve & request payment
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will approve the
                  application and request payment from the business.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isApproving}
                  onClick={() => {
                    approveApplication({ applicationId: application.id });
                  }}
                  className="bg-green-600 hover:bg-green-600/90"
                >
                  {isApproving && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Confirm & approve
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={isApproving || isRejecting || isAssigning}
                variant={'destructive'}
                className="mt-3 w-full"
              >
                {isRejecting && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Reject
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Reject application</DialogTitle>

                <DialogDescription className="pt-2">
                  This action cannot be undone. This will reject the application
                  with a reason.
                </DialogDescription>
              </DialogHeader>

              <div className="py-5">
                <Textarea
                  value={rejectionReason}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setRejectionReason(e.target.value)
                  }
                  placeholder="Rejection reason"
                />
              </div>

              <DialogFooter>
                <Button
                  disabled={isApproving || isRejecting || isAssigning}
                  onClick={() => {
                    rejectApplication({
                      applicationId: application.id,
                      rejectionReason,
                    });
                  }}
                  variant={'destructive'}
                >
                  {isRejecting && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Confirm & reject
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={isApproving || isRejecting || isAssigning}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-600/90"
              >
                {isAssigning && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Approve & don't charge
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Assign certificate without charging</DialogTitle>

                <DialogDescription className="pt-2">
                  This action cannot be undone. This will approve the
                  application and assign a certificate without charging the
                  business.
                </DialogDescription>
              </DialogHeader>

              <div className="py-5 space-y-5">
                <Input
                  value={uId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUId(e.target.value)
                  }
                  type="text"
                  placeholder="Unique application id"
                />

                <div>
                  <p className="mb-3 block text-sm font-medium text-muted-foreground">
                    Certificate image
                  </p>

                  <Input
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files) {
                        setCertificateImgFile(Array.from(files));
                      }
                    }}
                    type="file"
                  />
                </div>

                <div>
                  <p className="mb-3 block text-sm font-medium text-muted-foreground">
                    Certificate file (pdf)
                  </p>

                  <Input
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files && files[0].type === 'application/pdf') {
                        setCertificateFile(Array.from(files));
                      } else {
                        toast({
                          variant: 'destructive',
                          title: 'Please upload a pdf',
                        });
                      }
                    }}
                    type="file"
                    accept="application/pdf"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={isApproving || isRejecting || isAssigning}
                  onClick={handleAssignApplicationCertificate}
                  className="bg-blue-600 hover:bg-blue-600/90"
                >
                  {isAssigning && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Confirm & assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {isAdminView && application.status === 'AWAITING_PAYMENT' && (
        <div className="mt-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                disabled={isApproving || isRejecting || isAssigning}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-600/90"
              >
                {isAssigning && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Skip payment
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Assign certificate without charging</DialogTitle>

                <DialogDescription className="pt-2">
                  This action cannot be undone. This will assign a certificate
                  without charging the business.
                </DialogDescription>
              </DialogHeader>

              <div className="py-5 space-y-5">
                <Input
                  value={uId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUId(e.target.value)
                  }
                  type="text"
                  placeholder="Unique application id"
                />

                <div>
                  <p className="mb-3 block text-sm font-medium text-muted-foreground">
                    Certificate image
                  </p>

                  <Input
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files) {
                        setCertificateImgFile(Array.from(files));
                      }
                    }}
                    type="file"
                  />
                </div>

                <div>
                  <p className="mb-3 block text-sm font-medium text-muted-foreground">
                    Certificate file (pdf)
                  </p>

                  <Input
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files && files[0].type === 'application/pdf') {
                        setCertificateFile(Array.from(files));
                      } else {
                        toast({
                          variant: 'destructive',
                          title: 'Please upload a pdf',
                        });
                      }
                    }}
                    type="file"
                    accept="application/pdf"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  disabled={isApproving || isRejecting || isAssigning}
                  onClick={handleAssignApplicationCertificate}
                  className="bg-blue-600 hover:bg-blue-600/90"
                >
                  {isAssigning && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Confirm & assign
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {isAdminView &&
        application.status === 'PAID' &&
        !application.uId &&
        !application.certificateImgUrl &&
        !application.expiresAt && (
          <div className="mt-12">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  disabled={isApproving || isRejecting || isAssigning}
                  className="mt-3 w-full"
                >
                  {isAssigning && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Assign certificate
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assign certificate</DialogTitle>

                  <DialogDescription className="pt-2">
                    This action cannot be undone. This will assign a certificate
                    to the business.
                  </DialogDescription>
                </DialogHeader>

                <div className="py-5 space-y-5">
                  <Input
                    value={uId}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUId(e.target.value)
                    }
                    type="text"
                    placeholder="Unique application id"
                  />

                  <div>
                    <p className="mb-3 block text-sm font-medium text-muted-foreground">
                      Certificate image
                    </p>

                    <Input
                      onChange={(e) => {
                        const files = e.target.files;

                        if (files) {
                          setCertificateImgFile(Array.from(files));
                        }
                      }}
                      type="file"
                    />
                  </div>

                  <div>
                    <p className="mb-3 block text-sm font-medium text-muted-foreground">
                      Certificate file (pdf)
                    </p>

                    <Input
                      onChange={(e) => {
                        const files = e.target.files;

                        if (files && files[0].type === 'application/pdf') {
                          setCertificateFile(Array.from(files));
                        } else {
                          toast({
                            variant: 'destructive',
                            title: 'Please upload a pdf',
                          });
                        }
                      }}
                      type="file"
                      accept="application/pdf"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    disabled={isApproving || isRejecting || isAssigning}
                    onClick={handleAssignApplicationCertificate}
                  >
                    {isAssigning && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Confirm & assign
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

      {isAdminView &&
        !application.isBlocked &&
        application.status === 'PAID' &&
        application.uId &&
        application.certificateImgUrl &&
        application.expiresAt && (
          <div className="mt-12">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isBlocking}
                  variant={'destructive'}
                  className="w-full"
                >
                  {isBlocking && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Block
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will block the business.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isBlocking}
                    onClick={() => {
                      blockApplication({ applicationId: application.id });
                    }}
                    className="bg-red-600 hover:bg-red-600/90"
                  >
                    {isBlocking && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Confirm & block
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

      {isAdminView &&
        application.isBlocked &&
        application.status === 'PAID' &&
        application.uId &&
        application.certificateImgUrl &&
        application.expiresAt && (
          <div className="mt-12">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  disabled={isUnblocking}
                  variant={'destructive'}
                  className="w-full"
                >
                  {isUnblocking && (
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Unblock
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will unblock the
                    business.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isUnblocking}
                    onClick={() => {
                      unblockApplication({ applicationId: application.id });
                    }}
                    className="bg-red-600 hover:bg-red-600/90"
                  >
                    {isUnblocking && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Confirm & unblock
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
    </div>
  );
}
