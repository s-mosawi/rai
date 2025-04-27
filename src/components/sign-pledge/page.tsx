"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import SignatureCanvas from 'react-signature-canvas';
import validator from "validator";
import { CircleCheckBig, X } from "lucide-react";
import { ENDPOINT } from '../../var.ts'

const { isEmail } = validator;

const pledge = `
I, the undersigned, hereby commit to ensuring that all my work related to artificial intelligence (AI) is conducted with the utmost respect for safety, ethics, and the public trust. I recognise the immense potential of AI and the serious responsibilities that come with its development and deployment. In accepting this responsibility, I pledge to uphold the following principles:

I will design and develop AI systems that place safety and security at the forefront. I commit to protecting individual privacy and civil liberties in every project and to ensuring that all systems are created with transparent methods that facilitate accountability.

I will integrate ethical guidelines and rigorous risk management practices throughout every stage of the AI lifecycle. I will actively identify and mitigate potential harms including bias, discrimination, and any misuse that may arise from AI systems. I will strive to maintain fairness and accountability in all my work.

I will continuously pursue improvement through regular self-assessment and independent reviews. I will seek feedback from a wide range of experts and remain committed to ongoing education and training in responsible AI practices.

I also declare that I will prohibit and strictly control developments deemed high risk or unacceptable. To this end, I will not engage in or support:

Developments designed for autonomous use in lethal operations or any harmful military applications
AI applications that facilitate mass surveillance and infringe on individual privacy without just cause
Developments that create or disseminate deceptive deepfakes or synthetic content intended to mislead or cause harm
Systems that automate decisions in high-stakes areas such as healthcare, justice, or employment without comprehensive oversight and robust bias mitigation
Applications that discriminate or systematically disadvantage any individual or group based on race, gender, religion, or any other personal characteristic
Any AI initiatives that elevate risks to public safety, social cohesion, or democratic processes
By signing this pledge, I affirm my dedication to these principles and standards. I commit to striving for innovation that is not only effective but also safe, ethical, and beneficial to all Australians.
`;

interface InputFieldProps {
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

interface SignaturePadProps {
  onSave?: (signatureData: string) => void;
  onClear?: () => void;
  width?: number;
  height?: number;
  penColor?: string;
  backgroundColor?: string;
  value?: string;
}

const SignaturePad: React.FC<SignaturePadProps> = React.memo(({
  onSave,
  onClear,
  width = 100,
  height = 50,
  penColor = 'black',
  backgroundColor = 'white',
  value,
}) => {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSigned, setIsSigned] = useState(false);

  const clear = useCallback(() => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setIsSigned(false);
      onClear?.();
    }
  }, [onClear]);

  const handleSignatureEnd = useCallback(() => {
    setIsSigned(true);
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL('image/png');
      onSave?.(signatureData);
    }
  }, [onSave]);

  useEffect(() => {
    if (value && sigCanvas.current && !isSigned) {
      sigCanvas.current.fromDataURL(value);
      setIsSigned(true);
    }
  }, [value, isSigned]);

  return (
    <div className="signature-pad-container space-y-4">
      <div
        className="border border-[#e5e5e5] rounded-lg overflow-hidden shadow-sm"
        style={{ width: `${width}px`, height: `${height}px`, backgroundColor }}
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor={penColor}
          canvasProps={{
            width,
            height,
            className: 'signature-canvas w-full h-full',
          }}
          onEnd={handleSignatureEnd}
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="button"
          onClick={clear}
          disabled={!isSigned}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md disabled:opacity-50"
        >
          Clear Signature
        </button>
      </div>
    </div>
  );
});

const InputField = React.memo(({
  label,
  id,
  type = "text", 
  value,
  onChange,
  placeholder,
  className = "",
  disabled = false,
  required = false,
  ...props
}: InputFieldProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-black mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 
          border border-[#e5e5e5] 
          rounded-md 
          focus:outline-none 
          focus:ring-1 focus:ring-black 
          focus:border-black
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      />
    </div>
  );
});

export default function SignPledge({ shouldShowPopup }) {
  const [page, setPage] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    signature: '',
    email: '',
    organisation: '',
    city: '',
    role: ''
  });
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTint, shouldShowTint] = useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);	
    try {
      const response = await fetch(ENDPOINT + '/pledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });      
      if (response.ok) {
        shouldShowTint(true);
        return;
      }
    } catch(e) {
      return	
    } finally {
      setIsSubmitting(false); 	
    }
  };

  const handleSignatureSave = useCallback((signature: string) => {
    setFormData(prev => ({ ...prev, signature }));
  }, []);

  const handleSignatureClear = useCallback(() => {
    setFormData(prev => ({ ...prev, signature: '' }));
  }, []);

  const handleInputChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-[10000] bg-black bg-opacity-50">
        <div className="p-6 flex flex-col justify-between fixed left-1/2 top-1/2 w-[94%] md:w-[65%] max-w-[88%] h-[94%] bg-white border border-[#e9e9e9] rounded-lg transform -translate-x-1/2 -translate-y-1/2 overflow-auto transition-all duration-300 scale-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-[20px] font-semibold">Responsible AI – The Pledge</h1>
              <div className="text-sm text-muted-foreground">{page === 0 ? 
                'Sign the pledge and join the movement for ethical AI development' :
                'Complete your contact information to finalize your pledge'
              }
              </div>
            </div>
            <button 
              onClick={() => shouldShowPopup(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className={`p-4 ${page === 0 ? 'border border-[#e9e9e9]' : ''} rounded-lg h-[75%] min-h-[75%] max-h-[75%] overflow-auto`}>
            {page === 0 ? (
              <>
                <p>{pledge}</p>
                <div className="mt-10 flex gap-4" style={{ flexWrap: 'wrap' }}>
                  <div>
                    <div className="block text-sm font-medium text-black mb-1">Signature:</div>
                    <SignaturePad                      
                      width={240}
                      height={120}
                      penColor="black"
                      onSave={handleSignatureSave}
                      onClear={handleSignatureClear}
                      value={formData.signature}
                    />
                  </div>
                  <InputField 
                    label="Fullname:" 
                    id="fullname" 
                    type="text"
                    placeholder="Your full name"
                    value={formData.name} 
                    onChange={handleInputChange('name')}
                  />  
                  <InputField 
                    label="Date:" 
                    id="date" 
                    type="date"
                    value={formData.date} 
                    onChange={handleInputChange('date')}
                  />                     
                </div>
              </>) : (
                <div>
                  <div className="mb-4">
                    <div className="mb-1 text-center text-[18px] font-bold">Complete Your Pledge</div>
                    <div className="text-center text-sm text-muted-foreground">Please provide your contact information to finalize your pledge.</div>
                  </div>
                  <div>
                    <InputField 
                      label="Fullname*" 
                      id="fullname" 
                      type="text"
                      placeholder="Your full name"
                      value={formData.name} 
                      required
                      onChange={handleInputChange('name')}
                    />  
                    <div className="mb-7"></div> 
                    <InputField 
                      label="Email Address*" 
                      id="email" 
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email} 
                      required
                      onChange={handleInputChange('email')}
                    /> 
                    <div className="mb-7"></div>  
                    <InputField 
                      label="Organisation (optional)" 
                      id="organisation" 
                      type="text"
                      placeholder="Your Organisation"
                      value={formData.organisation} 
                      onChange={handleInputChange('organisation')}
                    /> 
                    <div className="mb-7"></div>    
                    <InputField 
                      label="City*" 
                      id="city" 
                      type="text"
                      placeholder="Your City"
                      required
                      value={formData.city} 
                      onChange={handleInputChange('city')}
                    /> 
                    <div className="mb-7"></div>   
                    <InputField 
                      label="Role (optional)" 
                      id="role" 
                      type="text"
                      placeholder="Your Role"
                      value={formData.role} 
                      onChange={handleInputChange('role')}
                    /> 
                    <div className="mb-7"></div>   
                    <div className="my-2 flex items-center gap-2">
                      <Checkbox 
                        id="terms" 
                        checked={isChecked} 
                        onCheckedChange={(checked) => setIsChecked(checked === true)} 
                        required 
                      />
                      <label htmlFor="terms" className="text-sm">
                        I confirm I have read and agree to the pledge{" "}
                        <Link href={"/terms-of-service"} className="underline">
                          terms
                        </Link>{" "}and {" "}
                        <Link href={"/privacy-policy"} className="underline">
                          privacy policy
                        </Link>  
                      </label>
                    </div>                                                                                                 
                  </div>
                </div>	
              )
            }
          </div>
          <div className="flex justify-end gap-5 items-center">
            {page === 0 ? (
              <Button disabled={!(formData.name && formData.name.length >= 2 && formData.signature)} onClick={()=> setPage(1)}>
                Continue to Contact Information
              </Button>
            ) : (
              <div className="flex justify-between items-center w-full gap-5">
                <Button variant="outline" onClick={()=> setPage(0)}>Back to Pledge</Button>
                <Button disabled={isSubmitting || !(
                  formData.name && formData.name.length >= 2 && formData.signature && formData.email &&
                  isEmail(formData.email) && formData.city && isChecked	        	
                )} onClick={handleSubmit}>
                  {isSubmitting ? 'Submitting' : 'Submit'} Pledge{isSubmitting ? '...' : ''}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showTint && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="p-7 bg-white rounded-xl w-[85%] md:w-[32%] max-w-[65%] max-h-[90vh] flex flex-col animate-in zoom-in-95">
            <div style={{ margin: 'auto'}} className="flex items-center justify-center w-10 h-10 rounded-[50px] bg-[rgba(100,255,100,0.2)]">
              <CircleCheckBig color="rgba(10,180,10,1)" />
            </div>
            <h1 className="mb-1 mt-1 text-center text-[24px] font-bold">Thank You for Your Pledge!</h1>
            <div className="text-center text-m text-muted-foreground">Your commitment to ethical AI development has been recorded.</div>
            <div className="mt-4 text-center text-[17px]"> 
              <span>Dear</span>{" "}
              <span className="font-bold">{formData.name}</span>,
            </div>
            <div className="text-m text-center py-6">
              We've sent a confirmation email to <span className="font-bold">{formData.email}</span> with details of your pledge.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button onClick={()=> window.location.reload()}>Close</Button>
            </div>
          </div>    
        </div>	
      )}
    </>   	
  );
}
