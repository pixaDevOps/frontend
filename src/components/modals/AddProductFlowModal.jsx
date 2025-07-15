// import React, { useState, useEffect } from 'react';
// import AddProductModal from './AddProductModal';
// import AddProductVariantStep from './AddProductVariantStep';

// const AddProductFlowModal = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState(1);
//   const [productId, setProductId] = useState(null);

//   useEffect(() => {
//     if (!isOpen) {
//       setStep(1);
//       setProductId(null);
//     }
//   }, [isOpen]);

//   const handleNext = () => {
//     console.log('[FlowModal] Moving to next step...');
//     setStep((prev) => prev + 1);
//   };

//   const handlePrev = () => setStep((prev) => prev - 1);
//   const handleClose = () => onClose();

//   const handleProductCreated = (generatedId) => {
//     console.log('[FlowModal] Received product ID:', generatedId);
//     setProductId(generatedId);
//     handleNext(); // move to step 2
//   };

// return (
//   <>
//     {isOpen && (
//       <>
//         <p className="text-white bg-black px-3 py-2 fixed top-2 right-2 z-[9999]">
//           Step: {step} | Product ID: {productId}
//         </p>

//         <AddProductModal
//           isOpen={step === 1}
//           onClose={handleClose}
//           onNext={handleProductCreated}
//         />

//         <AddProductVariantStep
//           isOpen={step === 2}
//           onClose={handleClose}
//           onNext={handleNext}
//           onPrev={handlePrev}
//           productId={productId}
//         />
//       </>
//     )}
//   </>
// );

// };

// export default AddProductFlowModal;
