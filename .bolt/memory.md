# Project memory

## Product intent & audience

- ServSetu: a mobile app connecting Indian customers with local service technicians.
- Two user roles: customers (discover/book/pay) and technicians (manage jobs/earnings/KYC).
- Indian-market localization: ₹ pricing, UPI + cash payments, Aadhaar KYC, +91 mobile numbers, visiting-fee waiver rules.
- Currently a functional UI/UX prototype with demo interactions only — no real auth, OTP, payments, uploads, or backend persistence wired yet.

## Brand personality & voice

- Brand name: ServSetu; tagline referenced on splash screen.
- Trust-focused, service-oriented, practical tone suited to Indian consumers and gig/field technicians.

## Visual design & UX direction

- Color palette: Deep Navy, Trust Teal, Warm Accent.
- Animated splash screen using logo + tagline.
- Responsive styling via React Native StyleSheet (web-only CSS selectors removed to avoid parser errors).
- Screen flows implemented for both customer and technician journeys (login/register, home, discovery, filters, booking, quote approval, payment, warranties, transactions, notifications, support, dashboard, job management, services, earnings, work rules, KYC, payouts).
- Logo supplied as JPEG; converted to PNG for Expo app icon/splash requirements.

## Decisions, constraints & rationale

- Framework: Expo (React Native).
- React Native pinned to 0.79.6 (exact SDK-compatible version) to satisfy Expo health check.
- `expo-font` added as required peer package; Expo asset package added for SDK-matched bundling.
- Web compatibility packages installed so Metro web bundle succeeds.
- Web-style CSS selectors removed from StyleSheet blocks (React Native parser rejects them).
- Duplicate slider style key resolved.
- PNG branding assets required for native builds and splash/icon config.
- Project passes Expo health check and full web bundle validation.

## Open questions & assumptions

- Supabase intended as backend (referenced but not yet integrated) — schema, auth, storage, and data models undefined.
- Real OTP/SMS provider not chosen or connected.
- Payment gateway integration (UPI/cash confirmation PIN) is mocked — provider and flow TBD.
- Aadhaar verification flow is UI-only — actual API/provider unknown.
- Navigation library used not confirmed from available context.
- Target Expo SDK version not explicitly recorded (inferred from RN 0.79.6 alignment).