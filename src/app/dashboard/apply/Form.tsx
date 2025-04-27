"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useUploadThing } from "@/lib/uploadthing";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const maxScrollHeight = 1000000000000;

const aiToolsOrApplicationsBeingUsed = [
  "ChatGPT or other conversational AI (e.g. for customer service or content generation)",
  "AI-powered recommendation systems (e.g. for marketing or e-commerce)",
  "AI image or video analysis tools (e.g. for product inspection, surveillance)",
  "AI-based decision-making systems (e.g. hiring, loan approvals)",
  "Custom AI model development (e.g. building machine learning models in-house)",
  "My business does not use AI tools.",
];

const aiUseDescriptions = [
  "Low-risk AI: Simple tools like AI for content creation (e.g., ChatGPT for writing articles)",
  "Medium-risk AI: Tools like recommendation systems or marketing automation",
  "High-risk AI: AI involved in critical areas like healthcare, finance, law enforcement",
];

const highRiskAreas = [
  "Healthcare or medical diagnosis",
  "Employment and hiring decisions",
  "Law enforcement or surveillance",
  "Financial services (e.g. credit scoring, loan approvals)",
  "Our business does not use AI in high-risk areas.",
];

export default function Form({ userName }: { userName: string }) {
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload } = useUploadThing("mediaUploader", {
    onUploadError: () => {
      setIsLoading(false);

      toast({
        variant: "destructive",
        title:
          "Error uploading files, make sure you are only uploading images or pdfs",
      });
    },
  });

  const { mutate: createApplication } = trpc.application.create.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      toast({
        title: "Application submitted successfully",
      });

      router.push("/dashboard");
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  // Requirements
  const [businessName, setBusinessName] = useState<string>("");
  const [businessAddress, setBusinessAddress] = useState<string>("");
  const [businessSector, setBusinessSector] = useState<string>("");
  const [businessSize, setBusinessSize] = useState<string>("");
  const [businessWebsite, setBusinessWebsite] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [businessLogoFile, setBusinessLogoFile] = useState<File[] | null>(null);

  const [pledgeFile, setPledgeFile] = useState<File[] | null>(null);
  const [aiPolicyFile, setAIPolicyFile] = useState<File[] | null>(null);
  const [isoCertificationFile, setISOCertificationFile] = useState<
    File[] | null
  >(null);

  const [
    howBusinessUsesAIOrPlansToDevelopAI,
    setHowBusinessUsesAIOrPlansToDevelopAI,
  ] = useState<string>("");
  const [
    selectedAIToolsOrApplicationsBeingUsed,
    setSelectedAIToolsOrApplicationsBeingUsed,
  ] = useState<string[]>([]);
  const [purposeOfUsingPreBuiltAIModels, setPurposeOfUsingPreBuiltAIModels] =
    useState<string>("");

  const [
    howBusinessIdentifyAndMitigateRisks,
    setHowBusinessIdentifyAndMitigateRisks,
  ] = useState<string>("");
  const [
    doesBusinessFollowAnyEthicalGuidelinesOrFrameworks,
    setDoesBusinessFollowAnyEthicalGuidelinesOrFrameworks,
  ] = useState<string>("");
  const [
    howBusinessEnsurePrivacyAndSecurityOfPersonalData,
    setHowBusinessEnsurePrivacyAndSecurityOfPersonalData,
  ] = useState<string>("");

  const [
    isCompliantWithAustralianDataProtectionLaws,
    setIsCompliantWithAustralianDataProtectionLaws,
  ] = useState<string>("");
  const [
    doesBusinessEnsureAIDoesNotDiscriminate,
    setDoesBusinessEnsureAIDoesNotDiscriminate,
  ] = useState<string>("");

  const [selectedAIUseDescriptions, setSelectedAIUseDescriptions] = useState<
    string[]
  >([]);
  const [selectedHighRiskAreas, setSelectedHighRiskAreas] = useState<string[]>(
    []
  );

  const [maintainDocs, setMaintainDocs] = useState<string>("");
  const [
    responsibleForOversightAndGovernance,
    setResponsibleForOversightAndGovernance,
  ] = useState<string>("");

  const [
    howBusinessIdentifyAndAddressBias,
    setHowBusinessIdentifyAndAddressBias,
  ] = useState<string>("");
  const [doesSystemUndergoRegularAudits, setDoesSystemUndergoRegularAudits] =
    useState<string>("");

  const [
    implementHumanInTheLoopMechanism,
    setImplementHumanInTheLoopMechanism,
  ] = useState<string>("");
  const [proceduresInPlaceToOverrideAI, setProceduresInPlaceToOverrideAI] =
    useState<string>("");

  const [howBusinessMeasureAndMitigate, setHowBusinessMeasureAndMitigate] =
    useState<string>("");
  const [
    descriptionOfAnyMeasuresBusinessTakes,
    setDescriptionOfAnyMeasuresBusinessTakes,
  ] = useState<string>("");

  const [doesBusinessHavePlansToScale, setDoesBusinessHavePlansToScale] =
    useState<string>("");
  const [
    governanceStructuresToEnsureResponsibleAIUse,
    setGovernanceStructuresToEnsureResponsibleAIUse,
  ] = useState<string>("");

  // Msgs & States
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [allRequirementsSubmitted, setAllRequirementsSubmitted] =
    useState<boolean>(false);

  const [showInitialMsg, setShowInitialMsg] = useState<boolean>(false);

  const [requirementsProgress, setRequirementsProgress] = useState<number>(0);

  const [showRequirement1Msg, setShowRequirement1Msg] =
    useState<boolean>(false);
  const [requirement1Submitted, setRequirement1Submitted] =
    useState<boolean>(false);

  const [showRequirement2Msg, setShowRequirement2Msg] =
    useState<boolean>(false);
  const [requirement2Submitted, setRequirement2Submitted] =
    useState<boolean>(false);

  const [showRequirement3Msg, setShowRequirement3Msg] =
    useState<boolean>(false);
  const [requirement3Submitted, setRequirement3Submitted] =
    useState<boolean>(false);

  const [showRequirement4Msg, setShowRequirement4Msg] =
    useState<boolean>(false);
  const [requirement4Submitted, setRequirement4Submitted] =
    useState<boolean>(false);

  const [showRequirement5Msg, setShowRequirement5Msg] =
    useState<boolean>(false);
  const [requirement5Submitted, setRequirement5Submitted] =
    useState<boolean>(false);

  const [showRequirement6Msg, setShowRequirement6Msg] =
    useState<boolean>(false);
  const [requirement6Submitted, setRequirement6Submitted] =
    useState<boolean>(false);

  const [showRequirement7Msg, setShowRequirement7Msg] =
    useState<boolean>(false);
  const [requirement7Submitted, setRequirement7Submitted] =
    useState<boolean>(false);

  const [showRequirement8Msg, setShowRequirement8Msg] =
    useState<boolean>(false);
  const [requirement8Submitted, setRequirement8Submitted] =
    useState<boolean>(false);

  const [showRequirement9Msg, setShowRequirement9Msg] =
    useState<boolean>(false);
  const [requirement9Submitted, setRequirement9Submitted] =
    useState<boolean>(false);

  const [showRequirement10Msg, setShowRequirement10Msg] =
    useState<boolean>(false);
  const [requirement10Submitted, setRequirement10Submitted] =
    useState<boolean>(false);

  const [showRequirement11Msg, setShowRequirement11Msg] =
    useState<boolean>(false);
  const [requirement11Submitted, setRequirement11Submitted] =
    useState<boolean>(false);

  const [showRequirement12Msg, setShowRequirement12Msg] =
    useState<boolean>(false);
  const [requirement12Submitted, setRequirement12Submitted] =
    useState<boolean>(false);

  const [showRequirement13Msg, setShowRequirement13Msg] =
    useState<boolean>(false);
  const [requirement13Submitted, setRequirement13Submitted] =
    useState<boolean>(false);

  const [showRequirement14Msg, setShowRequirement14Msg] =
    useState<boolean>(false);
  const [requirement14Submitted, setRequirement14Submitted] =
    useState<boolean>(false);

  const [showRequirement15Msg, setShowRequirement15Msg] =
    useState<boolean>(false);
  const [requirement15Submitted, setRequirement15Submitted] =
    useState<boolean>(false);

  const [showRequirement16Msg, setShowRequirement16Msg] =
    useState<boolean>(false);
  const [requirement16Submitted, setRequirement16Submitted] =
    useState<boolean>(false);

  const [showRequirement17Msg, setShowRequirement17Msg] =
    useState<boolean>(false);
  const [requirement17Submitted, setRequirement17Submitted] =
    useState<boolean>(false);

  const [showRequirement18Msg, setShowRequirement18Msg] =
    useState<boolean>(false);
  const [requirement18Submitted, setRequirement18Submitted] =
    useState<boolean>(false);

  const [showRequirement19Msg, setShowRequirement19Msg] =
    useState<boolean>(false);
  const [requirement19Submitted, setRequirement19Submitted] =
    useState<boolean>(false);

  const [showRequirement20Msg, setShowRequirement20Msg] =
    useState<boolean>(false);
  const [requirement20Submitted, setRequirement20Submitted] =
    useState<boolean>(false);

  const [showRequirement21Msg, setShowRequirement21Msg] =
    useState<boolean>(false);
  const [requirement21Submitted, setRequirement21Submitted] =
    useState<boolean>(false);

  const [showRequirement22Msg, setShowRequirement22Msg] =
    useState<boolean>(false);
  const [requirement22Submitted, setRequirement22Submitted] =
    useState<boolean>(false);

  const [showRequirement23Msg, setShowRequirement23Msg] =
    useState<boolean>(false);
  const [requirement23Submitted, setRequirement23Submitted] =
    useState<boolean>(false);

  const [showRequirement24Msg, setShowRequirement24Msg] =
    useState<boolean>(false);
  const [requirement24Submitted, setRequirement24Submitted] =
    useState<boolean>(false);

  const [showRequirement25Msg, setShowRequirement25Msg] =
    useState<boolean>(false);
  const [requirement25Submitted, setRequirement25Submitted] =
    useState<boolean>(false);

  const [showRequirement26Msg, setShowRequirement26Msg] =
    useState<boolean>(false);

  // Initial msg
  useEffect(() => {
    setTimeout(() => {
      setShowInitialMsg(true);
    }, 1500);
  }, []);

  // Requirement 1
  useEffect(() => {
    if (showInitialMsg) {
      setTimeout(() => {
        setShowRequirement1Msg(true);
      }, 1500);
    }
  }, [showInitialMsg]);

  // Requirement 2
  useEffect(() => {
    if (requirement1Submitted) {
      setRequirementsProgress(4);

      setTimeout(() => {
        setShowRequirement2Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement1Submitted]);

  // Requirement 3
  useEffect(() => {
    if (requirement2Submitted) {
      setRequirementsProgress(8);

      setTimeout(() => {
        setShowRequirement3Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement2Submitted]);

  // Requirement 4
  useEffect(() => {
    if (requirement3Submitted) {
      setRequirementsProgress(12);

      setTimeout(() => {
        setShowRequirement4Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement3Submitted]);

  // Requirement 5
  useEffect(() => {
    if (requirement4Submitted) {
      setRequirementsProgress(16);

      setTimeout(() => {
        setShowRequirement5Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement4Submitted]);

  // Requirement 6
  useEffect(() => {
    if (requirement5Submitted) {
      setRequirementsProgress(20);

      setTimeout(() => {
        setShowRequirement6Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement5Submitted]);

  // Requirement 7
  useEffect(() => {
    if (requirement6Submitted) {
      setRequirementsProgress(24);

      setTimeout(() => {
        setShowRequirement7Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement6Submitted]);

  // Requirement 8
  useEffect(() => {
    if (requirement7Submitted) {
      setRequirementsProgress(28);

      setTimeout(() => {
        setShowRequirement8Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement7Submitted]);

  // Requirement 9
  useEffect(() => {
    if (requirement8Submitted) {
      setRequirementsProgress(32);

      setTimeout(() => {
        setShowRequirement9Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement8Submitted]);

  // Requirement 10
  useEffect(() => {
    if (requirement9Submitted) {
      setRequirementsProgress(36);

      setTimeout(() => {
        setShowRequirement10Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement9Submitted]);

  // Requirement 11
  useEffect(() => {
    if (requirement10Submitted) {
      setRequirementsProgress(40);

      setTimeout(() => {
        setShowRequirement11Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement10Submitted]);

  // Requirement 12
  useEffect(() => {
    if (requirement11Submitted) {
      setRequirementsProgress(44);

      setTimeout(() => {
        setShowRequirement12Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement11Submitted]);

  // Requirement 13
  useEffect(() => {
    if (requirement12Submitted) {
      setRequirementsProgress(48);

      setTimeout(() => {
        setShowRequirement13Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement12Submitted]);

  // Requirement 14
  useEffect(() => {
    if (requirement13Submitted) {
      setRequirementsProgress(52);

      setTimeout(() => {
        setShowRequirement14Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement13Submitted]);

  // Requirement 15
  useEffect(() => {
    if (requirement14Submitted) {
      setRequirementsProgress(56);

      setTimeout(() => {
        setShowRequirement15Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement14Submitted]);

  // Requirement 16
  useEffect(() => {
    if (requirement15Submitted) {
      setRequirementsProgress(60);

      setTimeout(() => {
        setShowRequirement16Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement15Submitted]);

  // Requirement 17
  useEffect(() => {
    if (requirement16Submitted) {
      setRequirementsProgress(64);

      setTimeout(() => {
        setShowRequirement17Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement16Submitted]);

  // Requirement 18
  useEffect(() => {
    if (requirement17Submitted) {
      setRequirementsProgress(68);

      setTimeout(() => {
        setShowRequirement18Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement17Submitted]);

  // Requirement 19
  useEffect(() => {
    if (requirement18Submitted) {
      setRequirementsProgress(72);

      setTimeout(() => {
        setShowRequirement19Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement18Submitted]);

  // Requirement 20
  useEffect(() => {
    if (requirement19Submitted) {
      setRequirementsProgress(76);

      setTimeout(() => {
        setShowRequirement20Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement19Submitted]);

  // Requirement 21
  useEffect(() => {
    if (requirement20Submitted) {
      setRequirementsProgress(80);

      setTimeout(() => {
        setShowRequirement21Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement20Submitted]);

  // Requirement 22
  useEffect(() => {
    if (requirement21Submitted) {
      setRequirementsProgress(84);

      setTimeout(() => {
        setShowRequirement22Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement21Submitted]);

  // Requirement 23
  useEffect(() => {
    if (requirement22Submitted) {
      setRequirementsProgress(88);

      setTimeout(() => {
        setShowRequirement23Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement22Submitted]);

  // Requirement 24
  useEffect(() => {
    if (requirement23Submitted) {
      setRequirementsProgress(92);

      setTimeout(() => {
        setShowRequirement24Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement23Submitted]);

  // Requirement 25
  useEffect(() => {
    if (requirement24Submitted) {
      setRequirementsProgress(96);

      setTimeout(() => {
        setShowRequirement25Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement24Submitted]);

  // Requirement 26
  useEffect(() => {
    if (requirement25Submitted) {
      setRequirementsProgress(100);

      setTimeout(() => {
        setShowRequirement26Msg(true);

        window.scrollTo({
          top: maxScrollHeight,
          behavior: "smooth",
        });
      }, 1500);
    }
  }, [requirement25Submitted]);

  // Functions
  const handleSubmit = async () => {
    if (!isLoading && businessLogoFile && pledgeFile) {
      try {
        setIsLoading(true);

        const businessLogoRes = await startUpload(businessLogoFile);
        const businessLogoUrl =
          businessLogoRes && businessLogoRes[0] ? businessLogoRes[0].url : "";

        const pledgeRes = await startUpload(pledgeFile);
        const pledgeUrl = pledgeRes && pledgeRes[0] ? pledgeRes[0].url : "";

        let aiPolicyUrl: string | undefined;
        let isoCertificationUrl: string | undefined;

        if (aiPolicyFile) {
          const aiPolicyRes = await startUpload(aiPolicyFile);
          aiPolicyUrl = aiPolicyRes && aiPolicyRes[0] ? aiPolicyRes[0].url : "";
        }

        if (isoCertificationFile) {
          const isoCertificationRes = await startUpload(isoCertificationFile);
          isoCertificationUrl =
            isoCertificationRes && isoCertificationRes[0]
              ? isoCertificationRes[0].url
              : "";
        }

        createApplication({
          businessName,
          businessAddress,
          businessSector,
          businessSize,
          businessWebsite,
          businessLogoUrl,
          pledgeUrl,
          aiPolicyUrl,
          isoCertificationUrl,
          contactName,
          contactEmail,
          contactPhone,
          otherInfo: {
            howBusinessUsesAIOrPlansToDevelopAI,
            aiToolsOrApplicationsBeingUsed:
              selectedAIToolsOrApplicationsBeingUsed,
            purposeOfUsingPreBuiltAIModels,
            howBusinessIdentifyAndMitigateRisks,
            doesBusinessFollowAnyEthicalGuidelinesOrFrameworks,
            howBusinessEnsurePrivacyAndSecurityOfPersonalData,
            isCompliantWithAustralianDataProtectionLaws,
            doesBusinessEnsureAIDoesNotDiscriminate,
            aiUseDescriptions: selectedAIUseDescriptions,
            highRiskAreas: selectedHighRiskAreas,
            maintainDocs,
            responsibleForOversightAndGovernance,
            howBusinessIdentifyAndAddressBias,
            doesSystemUndergoRegularAudits,
            implementHumanInTheLoopMechanism,
            proceduresInPlaceToOverrideAI,
            howBusinessMeasureAndMitigate,
            descriptionOfAnyMeasuresBusinessTakes,
            doesBusinessHavePlansToScale,
            governanceStructuresToEnsureResponsibleAIUse,
          },
        });
      } catch (err) {
        setIsLoading(false);

        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      }
    }
  };

  return allRequirementsSubmitted ? (
    <div className="w-full max-w-[600px] flex flex-col items-center gap-y-8">
      <p className="text-muted-foreground text-center">
        Are you ready to submit your application?
      </p>

      <div className="flex gap-3">
        <Button
          disabled={isLoading}
          variant={"secondary"}
          onClick={() => {
            setAllRequirementsSubmitted(false);
          }}
        >
          Back
        </Button>

        <Button disabled={isLoading} onClick={handleSubmit}>
          {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
          Confirm & submit
        </Button>
      </div>
    </div>
  ) : (
    <div className="w-full max-w-[600px] space-y-24">
      <div className="fixed z-10 bottom-8 right-8 w-[75px]">
        <CircularProgressbar
          value={requirementsProgress}
          text={`${requirementsProgress}%`}
          styles={buildStyles({
            trailColor: "#f1f1f1",
            pathColor: "#420A8D",
            textColor: "#420A8D",
          })}
        />
      </div>

      {/* Initial msg */}
      <div className="ml-auto w-fit flex items-end gap-4">
        <div className="py-2 px-5 bg-secondary rounded-xl">
          {showInitialMsg ? (
            <p>Hey {userName}, thanks for your interest in getting certified</p>
          ) : (
            <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
          )}
        </div>

        <Image
          src="/images/syed-mosawi.png"
          alt=""
          width={50}
          height={50}
          className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
        />
      </div>

      {/* Requirement 1 */}
      <div className="space-y-10">
        {showInitialMsg && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement1Msg ? (
                <p>
                  Can you please provide general information of your business?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement1Msg && (
          <div className="flex flex-col items-center gap-3">
            <Input
              value={businessName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBusinessName(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Business name"
              required
              className="w-full max-w-[400px]"
            />

            <Input
              value={businessAddress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBusinessAddress(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Address"
              required
              className="w-full max-w-[400px]"
            />

            <Input
              value={businessSector}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBusinessSector(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Sector (e.g. finance, healthcare, education, etc)"
              required
              className="w-full max-w-[400px]"
            />

            <Select
              onValueChange={(e) => {
                setBusinessSize(e);
              }}
              disabled={requirement1Submitted}
            >
              <SelectTrigger className="w-full max-w-[400px]">
                <SelectValue placeholder="Company size" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1-2">1-2 employees</SelectItem>
                <SelectItem value="3-10">3-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="200+">More than 200 employees</SelectItem>
              </SelectContent>
            </Select>

            {businessSize && (
              <div className="w-full max-w-[450px] p-10 border border-secondary rounded-2xl flex flex-col items-center gap-8">
                {businessSize === "1-2" && (
                  <h3 className="text-[1.75rem] font-bold text-center text-primary">
                    AUD $199{" "}
                    <span className="text-base font-semibold">/year</span>
                  </h3>
                )}

                {businessSize === "3-10" && (
                  <h3 className="text-[1.75rem] font-bold text-center text-primary">
                    AUD $499{" "}
                    <span className="text-base font-semibold">/year</span>
                  </h3>
                )}

                {businessSize === "11-50" && (
                  <h3 className="text-[1.75rem] font-bold text-center text-primary">
                    AUD $699{" "}
                    <span className="text-base font-semibold">/year</span>
                  </h3>
                )}

                {businessSize === "51-200" && (
                  <h3 className="text-[1.75rem] font-bold text-center text-primary">
                    AUD $999{" "}
                    <span className="text-base font-semibold">/year</span>
                  </h3>
                )}

                {businessSize === "200+" && (
                  <h3 className="text-[1.75rem] font-bold text-center text-primary">
                    AUD $1499{" "}
                    <span className="text-base font-semibold">/year</span>
                  </h3>
                )}

                {businessSize === "1-2" && <p>1-2 employees</p>}
                {businessSize === "3-10" && <p>3-10 employees</p>}
                {businessSize === "11-50" && <p>11-50 employees</p>}
                {businessSize === "51-200" && <p>51-200 employees</p>}
                {businessSize === "200+" && <p>More than 200 employees</p>}

                <div className="flex flex-col items-center gap-2">
                  <p
                    className={`w-fit py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="stroke-green-600"
                      />
                    </svg>
                    Digital badge
                  </p>

                  <p
                    className={`w-fit py-1 pr-4 pl-[0.3rem] bg-green-100 rounded-full flex items-center gap-2 text-sm font-medium text-green-600 duration-200`}
                  >
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.25008 10.4504L8.75008 12.9504L13.7501 7.9504M18.3334 10.4504C18.3334 15.0528 14.6025 18.7837 10.0001 18.7837C5.39771 18.7837 1.66675 15.0528 1.66675 10.4504C1.66675 5.84803 5.39771 2.11707 10.0001 2.11707C14.6025 2.11707 18.3334 5.84803 18.3334 10.4504Z"
                        stroke-width="1.75"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="stroke-green-600"
                      />
                    </svg>
                    12 months validity
                  </p>
                </div>
              </div>
            )}

            <Input
              value={businessWebsite}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBusinessWebsite(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Website (optional)"
              required
              className="w-full max-w-[400px]"
            />

            <Input
              value={contactName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContactName(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Contact name"
              required
              className="w-full max-w-[400px]"
            />

            <Input
              value={contactEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContactEmail(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Contact email"
              required
              className="w-full max-w-[400px]"
            />

            <Input
              value={contactPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setContactPhone(e.target.value);
              }}
              disabled={requirement1Submitted}
              type="text"
              placeholder="Contact phone"
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={
                businessName.length < 1 ||
                businessAddress.length < 1 ||
                businessSector.length < 1 ||
                businessSize.length < 1 ||
                contactName.length < 1 ||
                contactEmail.length < 1 ||
                contactPhone.length < 1 ||
                requirement1Submitted
              }
              onClick={() => setRequirement1Submitted(true)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Requirement 2 */}
      <div className="space-y-10">
        {requirement1Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement2Msg ? (
                <p>
                  Thanks, {userName}. Can you please provide us your business
                  logo?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement2Msg && (
          <div className="flex justify-center gap-3">
            <Button
              variant={"secondary"}
              disabled={requirement2Submitted}
              onClick={() => {
                setRequirementsProgress(0);

                setShowRequirement1Msg(true);
                setRequirement1Submitted(false);

                setShowRequirement2Msg(false);
                setRequirement2Submitted(false);
              }}
            >
              Back
            </Button>

            <Input
              onChange={(e) => {
                const files = e.target.files;

                if (files) {
                  setBusinessLogoFile(Array.from(files));
                }
              }}
              disabled={requirement2Submitted}
              type="file"
              required
              className="w-full max-w-[300px]"
            />

            <Button
              disabled={businessLogoFile === null || requirement2Submitted}
              onClick={() => setRequirement2Submitted(true)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Requirement 3 */}
      <div className="space-y-10">
        {requirement2Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement3Msg ? (
                <p>
                  Please download the{" "}
                  <Link
                    href={"/docs/pledge-template.docx"}
                    target="_blank"
                    className="text-primary underline"
                  >
                    pledge
                  </Link>
                  , sign it, and upload it below:
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement3Msg && (
          <div className="flex justify-center gap-3">
            <Button
              variant={"secondary"}
              disabled={requirement3Submitted}
              onClick={() => {
                setRequirementsProgress(4);

                setShowRequirement2Msg(true);
                setRequirement2Submitted(false);

                setShowRequirement3Msg(false);
                setRequirement3Submitted(false);
              }}
            >
              Back
            </Button>

            <Input
              onChange={(e) => {
                const files = e.target.files;

                if (files && files[0].type === "application/pdf") {
                  setPledgeFile(Array.from(files));
                } else {
                  toast({
                    variant: "destructive",
                    title: "Please upload a pdf",
                  });
                }
              }}
              disabled={requirement3Submitted}
              type="file"
              accept="application/pdf"
              required
              className="w-full max-w-[300px]"
            />

            <Button
              disabled={pledgeFile === null || requirement3Submitted}
              onClick={() => setRequirement3Submitted(true)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Requirement 4 */}
      <div className="space-y-10">
        {requirement3Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement4Msg ? (
                <p>Do you have an AI policy? If yes, upload it below:</p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement4Msg && (
          <div className="flex justify-center gap-3">
            <Button
              variant={"secondary"}
              disabled={requirement4Submitted}
              onClick={() => {
                setRequirementsProgress(8);

                setShowRequirement3Msg(true);
                setRequirement3Submitted(false);

                setShowRequirement4Msg(false);
                setRequirement4Submitted(false);
              }}
            >
              Back
            </Button>

            <Input
              onChange={(e) => {
                const files = e.target.files;

                if (files && files[0].type === "application/pdf") {
                  setAIPolicyFile(Array.from(files));
                } else {
                  toast({
                    variant: "destructive",
                    title: "Please upload a pdf",
                  });
                }
              }}
              disabled={requirement4Submitted}
              type="file"
              accept="application/pdf"
              required
              className="w-full max-w-[300px]"
            />

            <Button
              disabled={requirement4Submitted}
              onClick={() => setRequirement4Submitted(true)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Requirement 5 */}
      <div className="space-y-10">
        {requirement4Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement5Msg ? (
                <p>
                  Is your business certified to ISO/IEC 42001:2023? If yes,
                  please upload it below:
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement5Msg && (
          <div className="flex justify-center gap-3">
            <Button
              variant={"secondary"}
              disabled={requirement5Submitted}
              onClick={() => {
                setRequirementsProgress(12);

                setShowRequirement4Msg(true);
                setRequirement4Submitted(false);

                setShowRequirement5Msg(false);
                setRequirement5Submitted(false);
              }}
            >
              Back
            </Button>

            <Input
              onChange={(e) => {
                const files = e.target.files;

                if (files && files[0].type === "application/pdf") {
                  setISOCertificationFile(Array.from(files));
                } else {
                  toast({
                    variant: "destructive",
                    title: "Please upload a pdf",
                  });
                }
              }}
              disabled={requirement5Submitted}
              type="file"
              accept="application/pdf"
              required
              className="w-full max-w-[300px]"
            />

            <Button
              disabled={requirement5Submitted}
              onClick={() => setRequirement5Submitted(true)}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Requirement 6 */}
      <div className="space-y-10">
        {requirement5Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement6Msg ? (
                <p>
                  Describe how your business uses AI or plans to develop AI
                  solutions:
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement6Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={howBusinessUsesAIOrPlansToDevelopAI}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHowBusinessUsesAIOrPlansToDevelopAI(e.target.value);
              }}
              disabled={requirement6Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement6Submitted}
              onClick={() => {
                setHowBusinessUsesAIOrPlansToDevelopAI(
                  "My business does not develop AI solutions but uses existing AI tools."
                );

                setRequirement6Submitted(true);
              }}
              variant={`${
                howBusinessUsesAIOrPlansToDevelopAI ===
                "My business does not develop AI solutions but uses existing AI tools."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              My business does not develop AI solutions but uses existing AI
              tools.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement6Submitted}
                onClick={() => {
                  setRequirementsProgress(16);

                  setShowRequirement5Msg(true);
                  setRequirement5Submitted(false);

                  setShowRequirement6Msg(false);
                  setRequirement6Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  howBusinessUsesAIOrPlansToDevelopAI.length < 1 ||
                  requirement6Submitted
                }
                onClick={() => setRequirement6Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 7 */}
      <div className="space-y-10">
        {requirement6Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement7Msg ? (
                <p>
                  Which of the following AI tools or applications are being used
                  in your business? (Select all that apply)
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement7Msg && (
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-3">
              {aiToolsOrApplicationsBeingUsed.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAIToolsOrApplicationsBeingUsed.includes(option)
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    if (index + 1 === aiToolsOrApplicationsBeingUsed.length) {
                      setSelectedAIToolsOrApplicationsBeingUsed([option]);
                    } else {
                      if (
                        selectedAIToolsOrApplicationsBeingUsed.includes(
                          aiToolsOrApplicationsBeingUsed[
                            aiToolsOrApplicationsBeingUsed.length - 1
                          ]
                        )
                      ) {
                        setSelectedAIToolsOrApplicationsBeingUsed([option]);
                      } else {
                        if (
                          selectedAIToolsOrApplicationsBeingUsed.includes(
                            option
                          )
                        ) {
                          setSelectedAIToolsOrApplicationsBeingUsed(
                            selectedAIToolsOrApplicationsBeingUsed.filter(
                              (item) => item !== option
                            )
                          );
                        } else {
                          setSelectedAIToolsOrApplicationsBeingUsed([
                            ...selectedAIToolsOrApplicationsBeingUsed,
                            option,
                          ]);
                        }
                      }
                    }
                  }}
                  disabled={requirement7Submitted}
                  className="max-w-[400px] !h-fit py-2 text-wrap"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement7Submitted}
                onClick={() => {
                  setRequirementsProgress(20);

                  setShowRequirement6Msg(true);
                  setRequirement6Submitted(false);

                  setShowRequirement7Msg(false);
                  setRequirement7Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  selectedAIToolsOrApplicationsBeingUsed.length < 1 ||
                  requirement7Submitted
                }
                onClick={() => setRequirement7Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 8 */}
      <div className="space-y-10">
        {requirement7Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement8Msg ? (
                <p>
                  If you use pre-built AI language models (e.g., GPT-4, BERT),
                  specify their purpose below:
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement8Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={purposeOfUsingPreBuiltAIModels}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setPurposeOfUsingPreBuiltAIModels(e.target.value);
              }}
              disabled={requirement8Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement8Submitted}
              onClick={() => {
                setPurposeOfUsingPreBuiltAIModels(
                  "We do not use pre-built AI language models."
                );

                setRequirement8Submitted(true);
              }}
              variant={`${
                purposeOfUsingPreBuiltAIModels ===
                "We do not use pre-built AI language models."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not use pre-built AI language models.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement8Submitted}
                onClick={() => {
                  setRequirementsProgress(24);

                  setShowRequirement7Msg(true);
                  setRequirement7Submitted(false);

                  setShowRequirement8Msg(false);
                  setRequirement8Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  purposeOfUsingPreBuiltAIModels.length < 1 ||
                  requirement8Submitted
                }
                onClick={() => setRequirement8Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 9 */}
      <div className="space-y-10">
        {requirement8Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement9Msg ? (
                <p>
                  How does your business identify and mitigate risks associated
                  with AI use?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement9Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={howBusinessIdentifyAndMitigateRisks}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHowBusinessIdentifyAndMitigateRisks(e.target.value);
              }}
              disabled={requirement9Submitted}
              placeholder="Risks such as bias, fairness, transparency, and accountability..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement9Submitted}
              onClick={() => {
                setHowBusinessIdentifyAndMitigateRisks(
                  "We do not develop or use AI systems that pose significant ethical risks."
                );

                setRequirement9Submitted(true);
              }}
              variant={`${
                howBusinessIdentifyAndMitigateRisks ===
                "We do not develop or use AI systems that pose significant ethical risks."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not develop or use AI systems that pose significant ethical
              risks.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement9Submitted}
                onClick={() => {
                  setRequirementsProgress(28);

                  setShowRequirement8Msg(true);
                  setRequirement8Submitted(false);

                  setShowRequirement9Msg(false);
                  setRequirement9Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  howBusinessIdentifyAndMitigateRisks.length < 1 ||
                  requirement9Submitted
                }
                onClick={() => setRequirement9Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 10 */}
      <div className="space-y-10">
        {requirement9Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement10Msg ? (
                <p>
                  Does your business follow any ethical guidelines or frameworks
                  for AI development and use?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement10Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={doesBusinessFollowAnyEthicalGuidelinesOrFrameworks}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDoesBusinessFollowAnyEthicalGuidelinesOrFrameworks(
                  e.target.value
                );
              }}
              disabled={requirement10Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement10Submitted}
              onClick={() => {
                setDoesBusinessFollowAnyEthicalGuidelinesOrFrameworks(
                  "We do not develop AI, and AI use is limited to non-critical functions (e.g., content creation, chatbots)"
                );

                setRequirement10Submitted(true);
              }}
              variant={`${
                doesBusinessFollowAnyEthicalGuidelinesOrFrameworks ===
                "We do not develop AI, and AI use is limited to non-critical functions (e.g., content creation, chatbots)"
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not develop AI, and AI use is limited to non-critical
              functions (e.g., content creation, chatbots)
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement10Submitted}
                onClick={() => {
                  setRequirementsProgress(32);

                  setShowRequirement9Msg(true);
                  setRequirement9Submitted(false);

                  setShowRequirement10Msg(false);
                  setRequirement10Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  doesBusinessFollowAnyEthicalGuidelinesOrFrameworks.length <
                    1 || requirement10Submitted
                }
                onClick={() => setRequirement10Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 11 */}
      <div className="space-y-10">
        {requirement10Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement11Msg ? (
                <p>
                  How does your business ensure the privacy and security of
                  personal data in AI systems?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement11Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={howBusinessEnsurePrivacyAndSecurityOfPersonalData}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHowBusinessEnsurePrivacyAndSecurityOfPersonalData(
                  e.target.value
                );
              }}
              disabled={requirement11Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement11Submitted}
              onClick={() => {
                setHowBusinessEnsurePrivacyAndSecurityOfPersonalData(
                  "AI systems used do not process personal or sensitive data."
                );

                setRequirement11Submitted(true);
              }}
              variant={`${
                howBusinessEnsurePrivacyAndSecurityOfPersonalData ===
                "AI systems used do not process personal or sensitive data."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              AI systems used do not process personal or sensitive data.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement11Submitted}
                onClick={() => {
                  setRequirementsProgress(36);

                  setShowRequirement10Msg(true);
                  setRequirement10Submitted(false);

                  setShowRequirement11Msg(false);
                  setRequirement11Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  howBusinessEnsurePrivacyAndSecurityOfPersonalData.length <
                    1 || requirement11Submitted
                }
                onClick={() => setRequirement11Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 12 */}
      <div className="space-y-10">
        {requirement11Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement12Msg ? (
                <p>
                  Is your AI use compliant with Australian data protection laws
                  (e.g., Privacy Act 1988, Australian Human Rights Commission’s
                  guidelines)?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement12Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={isCompliantWithAustralianDataProtectionLaws}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setIsCompliantWithAustralianDataProtectionLaws(e.target.value);
              }}
              disabled={requirement12Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement12Submitted}
              onClick={() => {
                setIsCompliantWithAustralianDataProtectionLaws(
                  "We do not process personal data through AI systems."
                );

                setRequirement12Submitted(true);
              }}
              variant={`${
                isCompliantWithAustralianDataProtectionLaws ===
                "We do not process personal data through AI systems."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not process personal data through AI systems.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement12Submitted}
                onClick={() => {
                  setRequirementsProgress(40);

                  setShowRequirement11Msg(true);
                  setRequirement11Submitted(false);

                  setShowRequirement12Msg(false);
                  setRequirement12Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  isCompliantWithAustralianDataProtectionLaws.length < 1 ||
                  requirement12Submitted
                }
                onClick={() => setRequirement12Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 13 */}
      <div className="space-y-10">
        {requirement12Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement13Msg ? (
                <p>
                  Does your business ensure AI does not discriminate based on
                  protected characteristics (e.g., race, gender, disability)?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement13Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={doesBusinessEnsureAIDoesNotDiscriminate}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDoesBusinessEnsureAIDoesNotDiscriminate(e.target.value);
              }}
              disabled={requirement13Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement13Submitted}
              onClick={() => {
                setDoesBusinessEnsureAIDoesNotDiscriminate(
                  "AI used in my business does not involve decision-making related to people or sensitive areas."
                );

                setRequirement13Submitted(true);
              }}
              variant={`${
                doesBusinessEnsureAIDoesNotDiscriminate ===
                "AI used in my business does not involve decision-making related to people or sensitive areas."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              AI used in my business does not involve decision-making related to
              people or sensitive areas.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement13Submitted}
                onClick={() => {
                  setRequirementsProgress(44);

                  setShowRequirement12Msg(true);
                  setRequirement12Submitted(false);

                  setShowRequirement13Msg(false);
                  setRequirement13Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  doesBusinessEnsureAIDoesNotDiscriminate.length < 1 ||
                  requirement13Submitted
                }
                onClick={() => setRequirement13Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 14 */}
      <div className="space-y-10">
        {requirement13Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement14Msg ? (
                <p>
                  Which of the following best describes your AI use? (Select all
                  that apply)
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement14Msg && (
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-3">
              {aiUseDescriptions.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedAIUseDescriptions.includes(option)
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    if (selectedAIUseDescriptions.includes(option)) {
                      setSelectedAIUseDescriptions(
                        selectedAIUseDescriptions.filter(
                          (selectedOption) => option !== selectedOption
                        )
                      );
                    } else {
                      setSelectedAIUseDescriptions([
                        ...selectedAIUseDescriptions,
                        option,
                      ]);
                    }
                  }}
                  disabled={requirement14Submitted}
                  className="max-w-[400px] !h-fit py-2 text-wrap"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement14Submitted}
                onClick={() => {
                  setRequirementsProgress(48);

                  setShowRequirement13Msg(true);
                  setRequirement13Submitted(false);

                  setShowRequirement14Msg(false);
                  setRequirement14Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  selectedAIUseDescriptions.length < 1 || requirement14Submitted
                }
                onClick={() => setRequirement14Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 15 */}
      <div className="space-y-10">
        {requirement14Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement15Msg ? (
                <p>
                  Does your business use AI in any of the following high-risk
                  areas? (Select all that apply)
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement15Msg && (
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-wrap justify-center gap-3">
              {highRiskAreas.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedHighRiskAreas.includes(option)
                      ? "default"
                      : "secondary"
                  }
                  onClick={() => {
                    if (index + 1 === highRiskAreas.length) {
                      setSelectedHighRiskAreas([option]);
                    } else {
                      if (
                        selectedHighRiskAreas.includes(
                          highRiskAreas[highRiskAreas.length - 1]
                        )
                      ) {
                        setSelectedHighRiskAreas([option]);
                      } else {
                        if (selectedHighRiskAreas.includes(option)) {
                          setSelectedHighRiskAreas(
                            selectedHighRiskAreas.filter(
                              (item) => item !== option
                            )
                          );
                        } else {
                          setSelectedHighRiskAreas([
                            ...selectedHighRiskAreas,
                            option,
                          ]);
                        }
                      }
                    }
                  }}
                  disabled={requirement15Submitted}
                  className="max-w-[400px] !h-fit py-2 text-wrap"
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement15Submitted}
                onClick={() => {
                  setRequirementsProgress(52);

                  setShowRequirement14Msg(true);
                  setRequirement14Submitted(false);

                  setShowRequirement15Msg(false);
                  setRequirement15Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  selectedHighRiskAreas.length < 1 || requirement15Submitted
                }
                onClick={() => setRequirement15Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 16 */}
      <div className="space-y-10">
        {requirement15Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement16Msg ? (
                <p>
                  Does your business maintain documentation of AI development
                  and testing processes?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement16Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={maintainDocs}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setMaintainDocs(e.target.value);
              }}
              disabled={requirement16Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement16Submitted}
              onClick={() => {
                setMaintainDocs(
                  "We do not develop AI in-house or perform custom model testing."
                );

                setRequirement16Submitted(true);
              }}
              variant={`${
                maintainDocs ===
                "We do not develop AI in-house or perform custom model testing."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not develop AI in-house or perform custom model testing.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement16Submitted}
                onClick={() => {
                  setRequirementsProgress(56);

                  setShowRequirement15Msg(true);
                  setRequirement15Submitted(false);

                  setShowRequirement16Msg(false);
                  setRequirement16Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={maintainDocs.length < 1 || requirement16Submitted}
                onClick={() => setRequirement16Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 17 */}
      <div className="space-y-10">
        {requirement16Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement17Msg ? (
                <p>
                  Who in your organisation is responsible for AI oversight and
                  governance?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement17Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={responsibleForOversightAndGovernance}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setResponsibleForOversightAndGovernance(e.target.value);
              }}
              disabled={requirement17Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement17Submitted}
              onClick={() => {
                setResponsibleForOversightAndGovernance(
                  "AI use in my business is minimal and does not require formal oversight."
                );

                setRequirement17Submitted(true);
              }}
              variant={`${
                responsibleForOversightAndGovernance ===
                "AI use in my business is minimal and does not require formal oversight."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              AI use in my business is minimal and does not require formal
              oversight.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement17Submitted}
                onClick={() => {
                  setRequirementsProgress(60);

                  setShowRequirement16Msg(true);
                  setRequirement16Submitted(false);

                  setShowRequirement17Msg(false);
                  setRequirement17Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  responsibleForOversightAndGovernance.length < 1 ||
                  requirement17Submitted
                }
                onClick={() => setRequirement17Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 18 */}
      <div className="space-y-10">
        {requirement17Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement18Msg ? (
                <p>
                  How does your business identify and address bias in AI models?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement18Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={howBusinessIdentifyAndAddressBias}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHowBusinessIdentifyAndAddressBias(e.target.value);
              }}
              disabled={requirement18Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement18Submitted}
              onClick={() => {
                setHowBusinessIdentifyAndAddressBias(
                  "We do not use AI in ways that affect people’s rights or decision-making."
                );

                setRequirement18Submitted(true);
              }}
              variant={`${
                howBusinessIdentifyAndAddressBias ===
                "We do not use AI in ways that affect people’s rights or decision-making."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not use AI in ways that affect people’s rights or
              decision-making.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement18Submitted}
                onClick={() => {
                  setRequirementsProgress(64);

                  setShowRequirement17Msg(true);
                  setRequirement17Submitted(false);

                  setShowRequirement18Msg(false);
                  setRequirement18Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  howBusinessIdentifyAndAddressBias.length < 1 ||
                  requirement18Submitted
                }
                onClick={() => setRequirement18Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 19 */}
      <div className="space-y-10">
        {requirement18Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement19Msg ? (
                <p>Does your AI system undergo regular fairness audits?</p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement19Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={doesSystemUndergoRegularAudits}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDoesSystemUndergoRegularAudits(e.target.value);
              }}
              disabled={requirement19Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement19Submitted}
              onClick={() => {
                setDoesSystemUndergoRegularAudits(
                  "We do not develop or use AI systems requiring fairness audits."
                );

                setRequirement19Submitted(true);
              }}
              variant={`${
                doesSystemUndergoRegularAudits ===
                "We do not develop or use AI systems requiring fairness audits."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not develop or use AI systems requiring fairness audits.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement19Submitted}
                onClick={() => {
                  setRequirementsProgress(68);

                  setShowRequirement18Msg(true);
                  setRequirement18Submitted(false);

                  setShowRequirement19Msg(false);
                  setRequirement19Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  doesSystemUndergoRegularAudits.length < 1 ||
                  requirement19Submitted
                }
                onClick={() => setRequirement19Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 20 */}
      <div className="space-y-10">
        {requirement19Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement20Msg ? (
                <p>
                  Does your business implement human-in-the-loop mechanisms for
                  AI decision-making?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement20Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={implementHumanInTheLoopMechanism}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setImplementHumanInTheLoopMechanism(e.target.value);
              }}
              disabled={requirement20Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement20Submitted}
              onClick={() => {
                setImplementHumanInTheLoopMechanism(
                  "AI used in my business does not make critical decisions."
                );

                setRequirement20Submitted(true);
              }}
              variant={`${
                implementHumanInTheLoopMechanism ===
                "AI used in my business does not make critical decisions."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              AI used in my business does not make critical decisions.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement20Submitted}
                onClick={() => {
                  setRequirementsProgress(72);

                  setShowRequirement19Msg(true);
                  setRequirement19Submitted(false);

                  setShowRequirement20Msg(false);
                  setRequirement20Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  implementHumanInTheLoopMechanism.length < 1 ||
                  requirement20Submitted
                }
                onClick={() => setRequirement20Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 21 */}
      <div className="space-y-10">
        {requirement20Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement21Msg ? (
                <p>
                  Are there procedures in place to override AI decisions if
                  necessary?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement21Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={proceduresInPlaceToOverrideAI}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setProceduresInPlaceToOverrideAI(e.target.value);
              }}
              disabled={requirement21Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement21Submitted}
              onClick={() => {
                setProceduresInPlaceToOverrideAI(
                  "Our AI systems do not make automated decisions without human review."
                );

                setRequirement21Submitted(true);
              }}
              variant={`${
                proceduresInPlaceToOverrideAI ===
                "Our AI systems do not make automated decisions without human review."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              Our AI systems do not make automated decisions without human
              review.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement21Submitted}
                onClick={() => {
                  setRequirementsProgress(76);

                  setShowRequirement20Msg(true);
                  setRequirement20Submitted(false);

                  setShowRequirement21Msg(false);
                  setRequirement21Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  proceduresInPlaceToOverrideAI.length < 1 ||
                  requirement21Submitted
                }
                onClick={() => setRequirement21Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 22 */}
      <div className="space-y-10">
        {requirement21Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement22Msg ? (
                <p>
                  How does your business measure and mitigate the environmental
                  impact of AI development?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement22Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={howBusinessMeasureAndMitigate}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setHowBusinessMeasureAndMitigate(e.target.value);
              }}
              disabled={requirement22Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement22Submitted}
              onClick={() => {
                setHowBusinessMeasureAndMitigate(
                  "Our AI use is limited to off-the-shelf tools with minimal environmental impact."
                );

                setRequirement22Submitted(true);
              }}
              variant={`${
                howBusinessMeasureAndMitigate ===
                "Our AI use is limited to off-the-shelf tools with minimal environmental impact."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              Our AI use is limited to off-the-shelf tools with minimal
              environmental impact.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement22Submitted}
                onClick={() => {
                  setRequirementsProgress(80);

                  setShowRequirement21Msg(true);
                  setRequirement21Submitted(false);

                  setShowRequirement22Msg(false);
                  setRequirement22Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  howBusinessMeasureAndMitigate.length < 1 ||
                  requirement22Submitted
                }
                onClick={() => setRequirement22Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 23 */}
      <div className="space-y-10">
        {requirement22Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement23Msg ? (
                <p>
                  Describe any measures your business takes to ensure AI
                  benefits society:
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement23Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={descriptionOfAnyMeasuresBusinessTakes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescriptionOfAnyMeasuresBusinessTakes(e.target.value);
              }}
              disabled={requirement23Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement23Submitted}
              onClick={() => {
                setDescriptionOfAnyMeasuresBusinessTakes(
                  "We do not have AI-related societal impact initiatives."
                );

                setRequirement23Submitted(true);
              }}
              variant={`${
                descriptionOfAnyMeasuresBusinessTakes ===
                "We do not have AI-related societal impact initiatives."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not have AI-related societal impact initiatives.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement23Submitted}
                onClick={() => {
                  setRequirementsProgress(84);

                  setShowRequirement22Msg(true);
                  setRequirement22Submitted(false);

                  setShowRequirement23Msg(false);
                  setRequirement23Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  descriptionOfAnyMeasuresBusinessTakes.length < 1 ||
                  requirement23Submitted
                }
                onClick={() => setRequirement23Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 24 */}
      <div className="space-y-10">
        {requirement23Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement24Msg ? (
                <p>
                  Does your business have plans to scale AI usage in the future?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement24Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={doesBusinessHavePlansToScale}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDoesBusinessHavePlansToScale(e.target.value);
              }}
              disabled={requirement24Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement24Submitted}
              onClick={() => {
                setDoesBusinessHavePlansToScale(
                  "We do not have plans to scale AI beyond its current usage."
                );

                setRequirement24Submitted(true);
              }}
              variant={`${
                doesBusinessHavePlansToScale ===
                "We do not have plans to scale AI beyond its current usage."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              We do not have plans to scale AI beyond its current usage.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement24Submitted}
                onClick={() => {
                  setRequirementsProgress(88);

                  setShowRequirement23Msg(true);
                  setRequirement23Submitted(false);

                  setShowRequirement24Msg(false);
                  setRequirement24Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  doesBusinessHavePlansToScale.length < 1 ||
                  requirement24Submitted
                }
                onClick={() => setRequirement24Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 25 */}
      <div className="space-y-10">
        {requirement24Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement25Msg ? (
                <p>
                  What governance structures are in place to ensure responsible
                  AI use as your business grows?
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement25Msg && (
          <div className="flex flex-col items-center gap-3">
            <Textarea
              value={governanceStructuresToEnsureResponsibleAIUse}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setGovernanceStructuresToEnsureResponsibleAIUse(e.target.value);
              }}
              disabled={requirement25Submitted}
              placeholder="Describe..."
              required
              className="w-full max-w-[400px]"
            />

            <Button
              disabled={requirement25Submitted}
              onClick={() => {
                setGovernanceStructuresToEnsureResponsibleAIUse(
                  "AI use in our business is minimal and not expected to grow significantly."
                );

                setRequirement25Submitted(true);
              }}
              variant={`${
                governanceStructuresToEnsureResponsibleAIUse ===
                "AI use in our business is minimal and not expected to grow significantly."
                  ? "default"
                  : "secondary"
              }`}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              AI use in our business is minimal and not expected to grow
              significantly.
            </Button>

            <div className="mt-7 flex gap-3">
              <Button
                variant={"secondary"}
                disabled={requirement25Submitted}
                onClick={() => {
                  setRequirementsProgress(92);

                  setShowRequirement24Msg(true);
                  setRequirement24Submitted(false);

                  setShowRequirement25Msg(false);
                  setRequirement25Submitted(false);
                }}
              >
                Back
              </Button>

              <Button
                disabled={
                  governanceStructuresToEnsureResponsibleAIUse.length < 1 ||
                  requirement25Submitted
                }
                onClick={() => setRequirement25Submitted(true)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Requirement 26 */}
      <div className="space-y-10">
        {requirement25Submitted && (
          <div className="ml-auto w-fit flex items-end gap-4">
            <div className="py-2 px-5 bg-secondary rounded-xl">
              {showRequirement26Msg ? (
                <p>
                  Hey {userName}, Thanks for submitting all the details above.
                  By submitting this application, you declare that all the
                  information provided in this application is true, accurate,
                  and factual to the best of your knowledge.
                </p>
              ) : (
                <Ellipsis className="w-5 h-5 text-muted-foreground animate-ping" />
              )}
            </div>

            <Image
              src="/images/syed-mosawi.png"
              alt=""
              width={50}
              height={50}
              className="w-[50px] min-w-[50px] h-[50px] object-cover rounded-full"
            />
          </div>
        )}

        {showRequirement26Msg && (
          <div className="flex flex-col items-center gap-3">
            <Button
              onClick={() => setAllRequirementsSubmitted(true)}
              className="max-w-[400px] !h-fit py-2 text-wrap"
            >
              Acknowledge and Submit Application
            </Button>

            <Button
              variant={"secondary"}
              onClick={() => {
                setRequirementsProgress(96);

                setShowRequirement25Msg(true);
                setRequirement25Submitted(false);

                setShowRequirement26Msg(false);
              }}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
