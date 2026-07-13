import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#fafafa] px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl text-center">
        <div className="text-xs tracking-[3px] text-[#525252] mb-4">404</div>
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter text-black mb-6">
          Page not found
        </h1>
        <p className="text-lg text-[#525252] mb-10">
          The page you are looking for does not exist or has moved. Run trust on one OS instead —
          SupplierAdvisor® for verified trade.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="premium-button inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <a
            href="https://www.supplieradvisor.com/onboarding?type=business"
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button inline-flex items-center justify-center gap-3 border border-black/15 px-8 py-4 rounded-full font-semibold text-black hover:bg-black/5"
          >
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
