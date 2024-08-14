import { ChangeEvent } from "react";

export interface InputProps {
    htmlFor?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    placeholder?: string;
    type: 'text' | 'password' | 'email' | 'number';
    className?: string;
    id?: string;
    label: string;
  }

export interface ButtonProps {
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type: "submit" | "reset" | "button"
    className?: string;
    label: string;
    disabled?:boolean 
  }