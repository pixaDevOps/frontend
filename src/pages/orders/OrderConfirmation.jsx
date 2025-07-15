import React from 'react';
import OrderProductLayout from '../../components/ui/OrderProductLayout';
import Stepper from '../../components/ui/Stepper';
import OrderAddedIcon from '../../assets/icons/OrderAdded.svg'; // use correct asset path

const OrderConfirmationSuccess = ({ isOpen, onClose }) => {
  return (
    <OrderProductLayout isOpen={isOpen} onClose={onClose} title="Add new Order">
      <Stepper currentStep={4} totalSteps={4} />

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="flex flex-col items-center">
          <img src={OrderAddedIcon} alt="Success" className="w-80 h-auto mb-4" />
          <h2 className="text-xl font-bold text-green-600 text-center leading-snug">
            Order Successfully<br />Added
          </h2>
        </div>
      </div>
    </OrderProductLayout>
  );
};

export default OrderConfirmationSuccess;
