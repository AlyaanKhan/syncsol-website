import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

const STORAGE_KEY = 'syncsol_kashan_farewell_seen';

export default function FarewellDialog() {
    const [visible, setVisible] = useState(false);
    const [closing, setClosing] = useState(false);
    const overlayRef = useRef(null);

    useEffect(() => {
        const seen = sessionStorage.getItem(STORAGE_KEY);
        if (!seen) {
            // Small delay so the page has a moment to paint first
            const t = setTimeout(() => setVisible(true), 600);
            return () => clearTimeout(t);
        }
    }, []);

    const close = () => {
        setClosing(true);
        sessionStorage.setItem(STORAGE_KEY, '1');
        setTimeout(() => setVisible(false), 300);
    };

    useEffect(() => {
        if (!visible) return;
        document.body.style.overflow = 'hidden';
        const handleKey = (e) => { if (e.key === 'Escape') close(); };
        document.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKey);
        };
    }, [visible]);

    const handleOverlay = (e) => {
        if (e.target === overlayRef.current) close();
    };

    if (!visible) return null;

    return (
        <div
            className={`farewell-overlay${closing ? ' farewell-closing' : ''}`}
            ref={overlayRef}
            onClick={handleOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Farewell message"
        >
            <div className="farewell-box">
                {/* Decorative top bar */}
                <div className="farewell-top-bar" />

                <button className="modal-close farewell-close-btn" onClick={close} aria-label="Close">
                    <X size={18} />
                </button>

                {/* Photo */}
                <div className="farewell-photo-ring">
                    <img
                        src="/Kashan-CMO.jpeg"
                        alt="Kashan Hashmi"
                        className="farewell-photo"
                    />
                </div>

                {/* Content */}
                <div className="farewell-content">
                    <span className="section-label">A Note from SyncSol</span>
                    <h2 className="farewell-title">
                        Farewell, <span className="text-yellow">Kashan.</span>
                    </h2>
                    <p className="farewell-body">
                        We bid a heartfelt farewell to <strong>Kashan Hashmi</strong>, our Chief Marketing Officer,
                        whose energy, creativity, and drive helped shape SyncSol's voice and reach from day one.
                        His dedication to building meaningful connections between great technology and the people
                        who need it will always be a part of our foundation.
                    </p>
                    <p className="farewell-body farewell-body-secondary">
                        We wish you every success in the chapters ahead, Kashan. Once SyncSol, always SyncSol. 🤝
                    </p>
                    <button className="btn btn-yellow farewell-cta" onClick={close}>
                        Continue to SyncSol
                    </button>
                </div>

                {/* Bottom decorative dots */}
                <div className="farewell-deco-dots">
                    <span className="farewell-dot" />
                    <span className="farewell-dot farewell-dot-lg" />
                    <span className="farewell-dot" />
                </div>
            </div>
        </div>
    );
}
