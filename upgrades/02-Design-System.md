# 02 — Design-System.md

# Portfolio V3

## Design System

---

# Purpose

This document defines the visual language of the portfolio.

Every component, section, interaction and future feature must follow these rules.

This is not a UI kit.

It is the visual operating system of the product.

Consistency is more important than creativity.

A beautiful interface built inconsistently is still a poor product.

---

# Design Philosophy

The interface should feel engineered rather than decorated.

Every visual decision must feel deliberate.

Nothing should appear randomly positioned.

Nothing should appear randomly colored.

Nothing should appear randomly animated.

Visitors should subconsciously feel mathematical order.

---

# Visual DNA

Every screen should communicate these qualities.

Precision.

Calmness.

Confidence.

Breathing space.

Depth.

Consistency.

Professional craftsmanship.

---

# Design Keywords

Whenever a new feature is designed, it should satisfy these words.

Minimal.

Premium.

Quiet.

Editorial.

Architectural.

Physical.

Timeless.

Responsive.

Intentional.

Elegant.

If a feature cannot be described using at least five of these words, redesign it.

---

# Layout Philosophy

The portfolio should never feel like stacked containers.

Instead, it should feel like one large canvas.

Sections should visually connect.

Backgrounds should continue naturally.

Grid alignment should remain constant.

Spacing should remain predictable.

The user should never feel disconnected while scrolling.

---

# Grid System

Use a consistent layout grid across the entire website.

Desktop

12-column responsive grid.

Tablet

8-column grid.

Mobile

4-column grid.

Never manually position elements outside the grid unless intentionally breaking rhythm.

Every break from the grid must have purpose.

---

# Spacing Philosophy

Spacing creates rhythm.

Never guess spacing.

Use a mathematical spacing scale.

Base Unit

8px

Spacing Scale

4

8

12

16

24

32

48

64

80

96

128

160

192

Avoid values outside the scale.

Consistency creates perceived quality.

---

# Vertical Rhythm

Each section should breathe.

Never allow two major sections to visually collide.

Maintain generous whitespace.

The eye should rest before consuming new information.

Scrolling should feel comfortable rather than dense.

---

# Corner Radius System

Border radius communicates softness.

Use only predefined values.

Small Elements

8px

Buttons

14px

Cards

20px

Glass Panels

24px

Floating Elements

999px capsule where appropriate.

Never randomly mix radii.

Rounded corners should feel intentional.

---

# Stroke System

Borders should rarely exceed 1 pixel.

Use transparency rather than opacity.

Prefer:

white at very low opacity

instead of gray borders.

Borders should separate surfaces,

not draw attention.

---

# Elevation System

Every object exists on a physical layer.

Background

Layer 0

Decorative elements

Layer 1

Content

Layer 2

Cards

Layer 3

Floating Panels

Layer 4

Navigation

Layer 5

Dialogs

Layer 6

Cursor Lighting

Layer 7

Never allow elevation confusion.

Users should immediately understand depth.

---

# Shadow Philosophy

Shadows should feel atmospheric.

Never harsh.

Use multiple soft shadows rather than one dark shadow.

Shadow should communicate elevation.

Never decoration.

Every elevation level should have its own shadow language.

---

# Blur System

Blur is expensive.

Blur must always communicate depth.

Never blur for aesthetics alone.

Suggested hierarchy.

Background Blur

Very subtle.

Glass Blur

Medium.

Navigation Blur

Strong.

Modal Blur

Highest.

Never stack multiple blur layers unnecessarily.

---

# Glass Design Language

Glass is a material.

Not an effect.

Every glass component must contain:

Soft blur.

Noise texture.

Edge highlight.

Subtle reflection.

Physical transparency.

Dynamic lighting response.

Glass should feel touchable.

Avoid fake glass created only with backdrop-filter.

---

# Surface Hierarchy

Surface Types

Primary Surface

Content.

Secondary Surface

Cards.

Floating Surface

Glass.

Invisible Surface

Background.

Interactive Surface

Buttons.

Do not invent additional surface categories.

Consistency matters.

---

# Color Philosophy

The interface should rely primarily on luminance rather than saturation.

Dark surfaces should create contrast.

Accent colors should create focus.

Color is communication.

Not decoration.

---

# Color Roles

Background

Deep graphite.

Primary Text

Near white.

Secondary Text

Muted gray.

Accent

Electric blue.

Success

Soft green.

Warning

Amber.

Danger

Muted red.

Never introduce random colors.

---

# Accent Usage

Accent color should occupy less than five percent of the screen.

When everything is highlighted,

nothing is highlighted.

Accent should attract attention only when necessary.

---

# Typography Scale

Large Display

Hero titles.

Display

Major section titles.

Heading

Card titles.

Subheading

Supporting content.

Body

Paragraphs.

Small

Labels.

Caption

Metadata.

Never invent intermediate font sizes without reason.

Maintain hierarchy.

---

# Font Weight

Thin

Never.

Light

Rare.

Regular

Body.

Medium

Default UI.

Semibold

Section titles.

Bold

Hero only.

Avoid excessive bold typography.

Confidence comes from spacing,

not weight.

---

# Icon System

Icons should support text.

Never replace text.

Icons should remain consistent in:

Stroke width.

Corner radius.

Optical size.

Animation behavior.

Never mix filled and outlined icon families.

---

# Button Language

Buttons should feel physical.

Primary Button

Most important action.

Secondary Button

Supporting action.

Ghost Button

Low emphasis.

Text Button

Minimal interaction.

Never create additional button styles unless absolutely necessary.

---

# Button Behavior

Buttons should never aggressively scale.

Interactions should feel:

Soft.

Confident.

Precise.

Immediate.

Avoid cartoon-like bouncing.

---

# Card System

Cards should appear as floating objects.

Spacing inside cards should remain generous.

Cards should never feel cramped.

Every card should clearly communicate:

Purpose.

Hierarchy.

Interaction.

---

# Image Philosophy

Images should never dominate the experience.

Images support the story.

Typography tells the story.

Avoid oversized decorative graphics.

---

# Dividers

Avoid visible divider lines whenever possible.

Instead use:

Spacing.

Light.

Shadow.

Background contrast.

Only introduce dividers when information genuinely requires separation.

---

# Scrollbar

Scrollbar should feel integrated.

Thin.

Elegant.

Theme aware.

Never default browser styling.

Never oversized.

---

# Cursor Philosophy

Cursor should not become entertainment.

Cursor should become presence.

Its influence should remain subtle.

The user should almost never consciously notice cursor effects.

---

# Animation Tokens

Fast

100–150ms

Standard

200–300ms

Slow

400–600ms

Cinematic

700–1200ms

Anything longer must justify itself.

---

# Easing Philosophy

Avoid linear movement.

Avoid exaggerated elastic movement.

Motion should resemble physical objects.

Acceleration.

Momentum.

Deceleration.

Natural stopping.

Never robotic.

---

# Responsive Philosophy

Desktop receives the richest experience.

Tablet preserves structure.

Mobile preserves usability.

Never force desktop interactions onto touch devices.

---

# Theme System

Every theme should change only four categories.

Accent Color.

Glass Tint.

Lighting Temperature.

Particle Color.

Everything else remains consistent.

Users should always recognize the product regardless of theme.

---

# Consistency Rule

Every newly designed component must answer:

Does this look like it belongs to this product?

If not,

redesign it.

---

# Removal Rule

Whenever two design choices exist,

choose the simpler one.

Whenever two animations exist,

choose the calmer one.

Whenever two layouts exist,

choose the clearer one.

Whenever two colors exist,

choose the quieter one.

Elegance is subtraction.

---

# Premium Test

Every screen should pass this test.

Remove every animation.

Remove every shadow.

Remove every blur.

Remove every particle.

If the layout still looks beautiful,

the design system is successful.

If the interface collapses,

it depended on decoration rather than design.

---

# Final Principle

A great design system is invisible.

Users should never admire the design system itself.

They should simply feel that everything belongs exactly where it is.

That feeling of inevitability is the highest form of design consistency.
