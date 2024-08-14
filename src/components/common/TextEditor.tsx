// src/components/common/ClientOnlyEditor.tsx
import dynamic from 'next/dynamic';


// Dynamically import CustomTextEditor with ssr: false
const CustomTextEditor = dynamic(() => import('./CustomTextEditor '), { ssr: false });

export default CustomTextEditor;
