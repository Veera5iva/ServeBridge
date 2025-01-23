
'use client';
import React, { useState, useMemo } from 'react';
import { Check, Eye, EyeOff, X } from 'lucide-react';

// Constants
const PASSWORD_REQUIREMENTS = [
   { regex: /.{8,}/, text: 'At least 8 characters' },
   { regex: /[0-9]/, text: 'At least 1 number' },
   { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
   { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
   { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special characters' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
   colors: {
      0: 'bg-border',
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-amber-500',
      4: 'bg-amber-700',
      5: 'bg-emerald-500',
   } satisfies Record<StrengthScore, string>,
   texts: {
      0: 'Enter a password',
      1: 'Weak password',
      2: 'Medium password!',
      3: 'Strong password!!',
      4: 'Very Strong password!!!',
   } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

// Types
type Requirement = {
   met: boolean;
   text: string;
};

type PasswordStrength = {
   score: StrengthScore;
   requirements: Requirement[];
};

const PasswordInput = ({
   password,
   onPasswordChange
}: {
   password: string,
   onPasswordChange: (password: string, strength: number) => void
}) => {
   const [isVisible, setIsVisible] = useState(false);

   const calculateStrength = useMemo((): PasswordStrength => {
      const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
         met: req.regex.test(password),
         text: req.text,
      }));

      const score = requirements.filter((req) => req.met).length as StrengthScore;

      return { score, requirements };
   }, [password]);

   const handlePasswordChange = (newPassword: string) => {
      const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
         met: req.regex.test(newPassword),
         text: req.text,
      }));
      const score = requirements.filter((req) => req.met).length as StrengthScore;

      onPasswordChange(newPassword, score);
   };

   return (
      <div className='w-full'>
         <div className='relative'>
            <input
               id='password'
               type={isVisible ? 'text' : 'password'}
               value={password}
               onChange={(e) => handlePasswordChange(e.target.value)}
               placeholder='Password'
               aria-invalid={calculateStrength.score < 4}
               aria-describedby='password-strength'
               className='w-full p-2 border-2 rounded-md bg-background outline-none focus-within:border-blue-700 transition'
            />
            <button
               type='button'
               onClick={() => setIsVisible((prev) => !prev)}
               aria-label={isVisible ? 'Hide password' : 'Show password'}
               className='absolute inset-y-0 right-0 outline-none flex items-center justify-center w-9 text-muted-foreground/80 hover:text-foreground'
            >
               {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
         </div>

         <div className='flex gap-2 w-full justify-between mt-2'>
            {[1, 2, 3, 4, 5].map((level) => (
               <span
                  key={level}
                  className={`${calculateStrength.score >= level ? 'bg-green-200' : 'bg-border'
                     } p-1 rounded-full w-full`}
               ></span>
            ))}
         </div>

         <p
            id='password-strength'
            className='my-2 text-sm font-medium flex justify-between'
         >
            <span>Must contain:</span>
            <span>
               {
                  STRENGTH_CONFIG.texts[
                  Math.min(
                     calculateStrength.score,
                     4
                  ) as keyof typeof STRENGTH_CONFIG.texts
                  ]
               }
            </span>
         </p>

         <ul className='space-y-1.5' aria-label='Password requirements'>
            {calculateStrength.requirements.map((req, index) => (
               <li key={index} className='flex items-center space-x-2'>
                  {req.met ? (
                     <Check size={16} className='text-emerald-500' />
                  ) : (
                     <X size={16} className='text-muted-foreground/80' />
                  )}
                  <span
                     className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'
                        }`}
                  >
                     {req.text}
                     <span className='sr-only'>
                        {req.met ? ' - Requirement met' : ' - Requirement not met'}
                     </span>
                  </span>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default PasswordInput;