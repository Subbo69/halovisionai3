import { useState } from 'react';
import { Check, Edit2, Loader2 } from 'lucide-react';
import { translations, Language } from '../utils/translations';

interface BookingConfirmationProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phone: string;
    revenueRange: string;
    website: string;
    businessDescription: string;
    reason: string;
  };
  selectedDate: Date;
  selectedTime: string;
  selectedTimezone: string;
  onEdit: () => void;
  onConfirm: () => Promise<void>;
  language: Language;
}

export default function BookingConfirmation({
  formData,
  selectedDate,
  selectedTime,
  selectedTimezone,
  onEdit,
  onConfirm,
  language,
}: BookingConfirmationProps) {
  const t = translations[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm();
      setIsSuccess(true);
    } catch (error) {
      console.error('Confirmation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = selectedDate.toLocaleDateString(language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (isSuccess) {
    return (
      <div className="p-6 md:p-10 bg-black/50 rounded-xl shadow-xl max-w-3xl mx-auto text-center">
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full p-6">
              <Check className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {language === 'de'
                ? 'Buchung bestätigt!'
                : language === 'fr'
                ? 'Réservation confirmée!'
                : 'Booking Confirmed!'}
            </h2>
            <p className="text-gray-300 text-lg max-w-md">
              {language === 'de'
                ? 'Bitte überprüfe deine E-Mail für die Bestätigung und Meeting-Details.'
                : language === 'fr'
                ? 'Veuillez vérifier votre e-mail pour la confirmation et les détails de la réunion.'
                : 'Please check your email for confirmation and meeting details.'}
            </p>
          </div>

          <div className="bg-white/5 border border-cyan-400/30 rounded-xl p-6 w-full max-w-md">
            <div className="space-y-3 text-left">
              <div>
                <p className="text-gray-400 text-sm">
                  {language === 'de' ? 'Datum' : language === 'fr' ? 'Date' : 'Date'}
                </p>
                <p className="text-white font-semibold">{formattedDate}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  {language === 'de' ? 'Zeit' : language === 'fr' ? 'Heure' : 'Time'}
                </p>
                <p className="text-white font-semibold">{selectedTime}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-semibold">{formData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-black/50 rounded-xl shadow-xl max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {language === 'de'
            ? 'Details überprüfen'
            : language === 'fr'
            ? 'Vérifier les détails'
            : 'Review Your Details'}
        </h2>
        <p className="text-gray-400">
          {language === 'de'
            ? 'Bitte überprüfe deine Angaben vor der Bestätigung'
            : language === 'fr'
            ? 'Veuillez vérifier vos informations avant de confirmer'
            : 'Please review your information before confirming'}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 border border-cyan-400/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {language === 'de' ? 'Meeting-Details' : language === 'fr' ? 'Détails de la réunion' : 'Meeting Details'}
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Datum:' : language === 'fr' ? 'Date:' : 'Date:'}</span>
              <span className="text-white font-semibold">{formattedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Zeit:' : language === 'fr' ? 'Heure:' : 'Time:'}</span>
              <span className="text-white font-semibold">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Zeitzone:' : language === 'fr' ? 'Fuseau horaire:' : 'Timezone:'}</span>
              <span className="text-white font-semibold">{selectedTimezone}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-cyan-400/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {language === 'de' ? 'Persönliche Informationen' : language === 'fr' ? 'Informations personnelles' : 'Personal Information'}
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Name:' : language === 'fr' ? 'Nom:' : 'Name:'}</span>
              <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="text-white font-semibold">{formData.email}</span>
            </div>
            {formData.phone && (
              <div className="flex justify-between">
                <span className="text-gray-400">{language === 'de' ? 'Telefon:' : language === 'fr' ? 'Téléphone:' : 'Phone:'}</span>
                <span className="text-white font-semibold">{formData.countryCode}{formData.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/5 border border-cyan-400/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {language === 'de' ? 'Geschäftsinformationen' : language === 'fr' ? 'Informations commerciales' : 'Business Information'}
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Website:' : language === 'fr' ? 'Site web:' : 'Website:'}</span>
              <span className="text-white font-semibold truncate max-w-xs">{formData.website}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">{language === 'de' ? 'Umsatz:' : language === 'fr' ? 'Revenu:' : 'Revenue:'}</span>
              <span className="text-white font-semibold">{formData.revenueRange}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-2">{language === 'de' ? 'Beschreibung:' : language === 'fr' ? 'Description:' : 'Description:'}</span>
              <p className="text-white">{formData.businessDescription}</p>
            </div>
            {formData.reason && (
              <div>
                <span className="text-gray-400 block mb-2">{language === 'de' ? 'Grund:' : language === 'fr' ? 'Raison:' : 'Reason:'}</span>
                <p className="text-white">{formData.reason}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <button
          onClick={onEdit}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 border border-white/20"
        >
          <Edit2 className="w-5 h-5" />
          <span>{language === 'de' ? 'Bearbeiten' : language === 'fr' ? 'Modifier' : 'Edit'}</span>
        </button>

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          <span>{language === 'de' ? 'Bestätigen' : language === 'fr' ? 'Confirmer' : 'Confirm Booking'}</span>
        </button>
      </div>
    </div>
  );
}
