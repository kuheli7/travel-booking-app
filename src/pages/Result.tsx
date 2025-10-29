import { useParams, useNavigate } from "react-router-dom";

export default function Result() {
  const { ref } = useParams<{ ref: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-xl w-full mx-auto px-4">
        <div className="bg-white rounded-xl-2 shadow-subtle p-6 md:p-8 text-center">
          {/* Success Icon */}
          <div className="mb-5">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-brandDark mb-2">Booking Confirmed!</h1>
          <p className="text-sm text-gray-600 mb-6">Your adventure awaits</p>
          
          {/* Booking Reference */}
          <div className="mb-6">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-wide">Booking Reference</p>
            <div className="inline-block bg-brandYellow px-6 py-3 rounded-lg shadow-sm">
              <span className="text-xl font-mono font-bold text-brandDark tracking-wider">{ref}</span>
            </div>
          </div>

          {/* Confirmation Message */}
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
              <p className="text-sm text-green-800 font-medium">
                ✉️ A confirmation email has been sent to your registered email address
              </p>
            </div>
            <p className="text-sm text-gray-600">
              Please save your booking reference <span className="font-semibold text-brandDark">{ref}</span> for future reference
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-8 py-3 bg-brandYellow hover:brightness-95 rounded-lg font-semibold text-brandDark transition-all shadow-sm"
          >
            Back to Home
          </button>
        </div>

        {/* Support Section */}
        <div className="mt-4 text-center text-xs text-gray-600">
          <p>Need help? Contact us at <a href="mailto:support@highwaydelite.com" className="text-brandDark font-medium hover:underline">support@highwaydelite.com</a></p>
        </div>
      </div>
    </div>
  );
}
