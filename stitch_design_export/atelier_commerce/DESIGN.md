---
name: Atelier Commerce
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e3'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fd'
  surface-container: '#ededf7'
  surface-container-high: '#e7e7f1'
  surface-container-highest: '#e2e2eb'
  on-surface: '#191b22'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3037'
  inverse-on-surface: '#f0f0fa'
  outline: '#737685'
  outline-variant: '#c3c6d5'
  surface-tint: '#2457c5'
  primary: '#003fa4'
  on-primary: '#ffffff'
  primary-container: '#2457c5'
  on-primary-container: '#ccd7ff'
  inverse-primary: '#b3c5ff'
  secondary: '#3259b6'
  on-secondary: '#ffffff'
  secondary-container: '#799dff'
  on-secondary-container: '#003183'
  tertiary: '#00522c'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c6b40'
  on-tertiary-container: '#9be9b3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b3c5ff'
  on-primary-fixed: '#001849'
  on-primary-fixed-variant: '#003fa5'
  secondary-fixed: '#dae1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#001849'
  on-secondary-fixed-variant: '#0f409d'
  tertiary-fixed: '#a6f4bd'
  tertiary-fixed-dim: '#8ad7a2'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#00522c'
  background: '#faf8ff'
  on-background: '#191b22'
  surface-variant: '#e2e2eb'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 3rem
---

## Brand & Style

This design system is crafted for a clean, human-centered, premium e-commerce experience. The aesthetic balances sophisticated minimalism with functional precision, designed to evoke trust, clarity, and understated luxury. 

The visual style relies on intentional whitespace, razor-thin borders, and a restrained color palette that centers product imagery. The UI is calm, unobtrusive, and highly responsive, prioritizing legibility and seamless navigation to ensure a frictionless shopping journey.

## Colors

The color palette is strictly restrained to maintain visual hierarchy and premium focus. Pure white (#FFFFFF) and soft warm grey (#F6F6F4) structure the background surfaces, while deep charcoal (#202020) and muted grey (#707070) govern typography. The primary action color is a confident royal blue (#2457C5) shifting to a deeper indigo (#1946A3) on interaction. Feedback states are communicated cleanly via specific green (#267347) for success and restrained crimson (#B42318) for errors.

## Typography

Typography utilizes Inter exclusively, structured to create precise geometric hierarchy. Letter-spacing is subtly tracked out for small labels and tracked in for major display headers to maximize clarity at every scale. Strict scaling rules apply on mobile viewports to prevent layout overflow.

## Layout & Spacing

This design system uses a fluid 12-column grid model paired with generous outer margins to ensure content breathes. Spacing rhythm follows a predictable 4px/8px incremental scale, ensuring consistent vertical rhythm across product grids, editorial banners, and checkout flows. On mobile, margins scale down to 1rem while maintaining consistent 12px gutters.

## Elevation & Depth

Depth is communicated through low-contrast outlines and subtle tonal layering rather than heavy drop shadows. Surfaces rely on crisp 1px borders (#E5E5E5) or subtle shifts between primary (#FFFFFF) and secondary (#F6F6F4) backgrounds. When floating elements like modals or dropdowns appear, they use hyper-diffused, low-opacity shadows tinted with the primary text hue to maintain a soft, premium separation.

## Shapes

The shape language is refined and restrained, utilizing a soft corner radius level (0.25rem base, 0.5rem for large containers). This minimal rounding removes harsh mechanical edges while preserving the structured, architectural integrity of the e-commerce interface. Fully pill-shaped variants are reserved exclusively for status badges and quantity tags.

## Components

### Buttons
Primary buttons utilize the action fill (#2457C5) with white text, transitioning to #1946A3 on hover. Secondary buttons feature transparent backgrounds with structural borders (#E5E5E5) and primary text. Maintain generous touch targets with a minimum height of 44px.

### Input Fields
Inputs feature a 1px border (#E5E5E5), subtle background contrast, and clear typographic labels placed above the field. Focus states transition the border instantly to the primary action color without introducing heavy glows.

### Cards
Product cards use a clean surface model with no default drop shadow, separated from the background purely by whitespace and subtle borders. Hover states scale product imagery gently inside its container while keeping the structural card layout static.

### Chips & Tags
Compact, pill-shaped elements used for filtering attributes, categories, or quick selections. They utilize the secondary background (#F6F6F4) in default states and invert to primary action styles when selected.

### Checkboxes & Radio Buttons
Constructed with precise geometric lines, utilizing 1px borders in resting states and solid primary color fills with high-contrast check or dot indicators when selected.

### Lists & Accordions
Optimized for dense product details, filter drawers, and checkout summaries. Dividers are rendered with 1px borders (#E5E5E5) and generous vertical padding.