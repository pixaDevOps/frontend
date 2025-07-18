import React, { useState } from 'react';
import OrderProductLayout from './components/OrderProductLayout';
import Stepper from '../../components/ui/Stepper';
import Button from '../../components/buttons/Buttons';
import CalendarModal from '../../components/ui/CalendarModal';
import CalendarIcon from '../../assets/icons/calendarIcon.svg';
import OrderProductSelection from './OrderProductSelection';

const OrderFormCustomer = ({ isOpen, onClose }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showProductSelection, setShowProductSelection] = useState(false); // renamed for clarity

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formatDateTime = (dateObj) => {
    if (!dateObj) return '00-00-0000 / 0:00 PM';
    const date = new Date(dateObj);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()} / ${date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
  };

  const labelClass = 'block text-sm font-semibold mb-1';
  const inputClass = 'w-full outline-none border text-xs border-gray-300 text-gray-500 rounded px-3 py-2';
  const selectClass = inputClass;
  const radioLabelClass = 'inline-flex items-center text-xs text-gray-500';

  const handleNext = (e) => {
    e.preventDefault();
    setShowProductSelection(true);
  };

  // 👉 Show next step (Product Selection)
  if (showProductSelection) {
    return (
      <OrderProductSelection
        isOpen={isOpen}
        onClose={onClose}
        onPrev={() => setShowProductSelection(false)}
        onNext={() => {
          console.log('[Step 3 Trigger] – Continue to next step');
        }}
      />
    );
  }

  return (
    <>
      <OrderProductLayout isOpen={isOpen} onClose={onClose} title="Add new Order">
        <Stepper currentStep={1} totalSteps={4} />

        <p className="text-base font-bold mt-4 mb-3 border-b">General Details</p>

        <p className="text-base font-bold mb-2">
          Order ID : <span className="font-bold">#00001</span>
        </p>

        <div className="flex items-center gap-2 text-sm text-black mb-3">
          <span>Date Created:</span>
          <button onClick={() => setShowCalendar(true)} className="flex items-center gap-1 font-semibold">
            {formatDateTime(selectedDate)}
            <img src={CalendarIcon} className="bg-secondary h-5 w-6 rounded-sm" alt="calendar" />
          </button>
        </div>

        <form onSubmit={handleNext} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className={labelClass}>Payment Type</label><select className={selectClass}><option>Online</option><option>Cash</option><option>Card</option></select></div>
          <div><label className={labelClass}>Customer Type</label><select className={selectClass}><option>Guest</option><option>Registered</option></select></div>
          <div></div>

          <div><label className={labelClass}>Name*</label><input type="text" placeholder="Enter name" className={inputClass} required /></div>
          <div><label className={labelClass}>Mobile Number*</label><input type="tel" maxLength="10" placeholder="Enter 10-digit number" className={inputClass} required /></div>
          <div><label className={labelClass}>Alternate Number</label><input type="tel" placeholder="Enter alternate" className={inputClass} /></div>
          <div><label className={labelClass}>Pin code*</label><input type="text" placeholder="Enter pin code" className={inputClass} required /></div>
          <div><label className={labelClass}>City/District/Town*</label><input type="text" value="Auto" readOnly className={inputClass} /></div>
          <div><label className={labelClass}>State*</label><select className={selectClass} defaultValue="Auto"><option>Auto</option></select></div>

          <div className="md:col-span-3"><label className={labelClass}>Address*</label><textarea rows="3" placeholder="Enter address" className={`${inputClass} mb-1`} required /></div>

          <div className="md:col-span-3 flex gap-3 mt-0.5 items-center">
            <label className={radioLabelClass}><input type="radio" name="addressType" className="mr-1" /> Home</label>
            <label className={radioLabelClass}><input type="radio" name="addressType" className="mr-1" /> Work</label>
          </div>

          <div className="md:col-span-3 flex justify-end pt-6">
            <Button type="submit" size="medium">Next ›</Button>
          </div>
        </form>
      </OrderProductLayout>

      {showCalendar && (
        <CalendarModal
          isOpen={showCalendar}
          onClose={() => setShowCalendar(false)}
          onDateSelect={handleDateSelect}
        />
      )}
    </>
  );
};

export default OrderFormCustomer;
