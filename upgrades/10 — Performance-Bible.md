# 10 — Performance-Bible.md

# Portfolio V3

## Performance Bible

---

# Purpose

Performance is not an optimization step.

Performance is a design feature.

Visitors should never think

"This website is smooth."

Instead,

smoothness should become invisible.

The portfolio should simply feel effortless.

Every animation,

every interaction,

every transition,

every effect,

must exist within a strict performance budget.

Beautiful software that stutters is not premium.

---

# Philosophy

Never ask

"Can we animate this?"

Always ask

"Can we animate this while maintaining perfect responsiveness?"

If the answer is uncertain,

reduce complexity.

Not performance.

---

# Performance Pyramid

Performance priorities are fixed.

They never change.

```
Content

↓

Interaction

↓

Scrolling

↓

Navigation

↓

Accessibility

↓

Motion

↓

Atmosphere

↓

Decorative Effects
```

If resources become limited,

remove effects from the bottom first.

Never compromise the top.

---

# The Golden Rule

The visitor should never wait.

Not for

Animations.

Scrolling.

Buttons.

Navigation.

Transitions.

Interactions.

Waiting destroys confidence.

Responsiveness builds trust.

---

# Rendering Philosophy

The browser should spend most of its time doing nothing.

Headroom creates smoothness.

Never design for maximum hardware.

Design for average hardware.

Premium software respects every device.

---

# Animation Budget

Every animation consumes resources.

Animations must earn their cost.

Do not measure animations by visual impact.

Measure them by

Visual Impact

÷

Performance Cost

The highest ratio wins.

---

# Frame Budget

Target

60 FPS

Not as a benchmark.

As a requirement.

Frame pacing should remain stable.

Consistency is more valuable than occasional peaks.

---

# Motion Budget

Never animate everything.

Choose one primary motion.

One supporting motion.

Everything else remains still.

Movement gains value through restraint.

---

# Blur Budget

Blur is one of the most expensive visual operations.

Use blur only where it communicates material depth.

Never stack multiple backdrop blurs.

Never blur entire layouts.

Glass deserves blur.

Backgrounds rarely do.

---

# Shadow Budget

Prefer several soft shadows over one large shadow.

Avoid extremely large blur radii.

Reuse shadow tokens.

Shadows should communicate elevation.

Not decoration.

---

# Gradient Budget

Animated gradients should evolve slowly.

Avoid high-frequency color movement.

The user should never consciously observe gradient animation.

They should only feel atmosphere.

---

# Particle Budget

Particles should support the environment.

Never become the environment.

Use the smallest number required.

Quality is preferred over quantity.

---

# Glass Budget

Glass should exist only where elevation exists.

Avoid glass for decorative purposes.

Every glass surface increases rendering complexity.

Respect the budget.

---

# JavaScript Budget

JavaScript should respond.

Not dominate.

Avoid continuous polling.

Prefer events.

Prefer observers.

Prefer state changes over constant calculations.

---

# Scroll Performance

Scrolling must remain sacred.

Nothing should ever block scrolling.

Heavy animations must gracefully adapt.

Never hijack scroll.

Never delay user movement.

The visitor controls the experience.

Always.

---

# Lenis Philosophy

Smooth scrolling should feel invisible.

Avoid exaggerated inertia.

Avoid excessive momentum.

Scrolling should feel closer to hardware than software.

Natural.

Predictable.

Responsive.

---

# GSAP Philosophy

GSAP orchestrates.

It does not own the application.

Every timeline should have

A clear purpose.

A lifecycle.

Cleanup.

Cancellation.

Avoid orphaned timelines.

Avoid hidden animations.

---

# ScrollTrigger Rules

Only animate elements that matter.

Destroy unused triggers.

Avoid excessive trigger creation.

Never animate invisible content.

Always clean up.

---

# GPU Philosophy

GPU resources are limited.

Treat them with respect.

Prefer transforms.

Prefer opacity.

Avoid expensive paint operations.

Avoid unnecessary compositing layers.

Every promoted layer should justify itself.

---

# CPU Philosophy

The CPU should mostly coordinate.

Not constantly calculate.

Avoid

Continuous loops.

Repeated measurements.

Layout thrashing.

Polling.

Expensive observers.

Everything event-driven.

---

# Memory Philosophy

Every animation created

must eventually disappear.

No memory leaks.

No forgotten listeners.

No abandoned observers.

No abandoned timelines.

Every lifecycle must end cleanly.

---

# Lazy Initialization

Heavy systems should initialize only when required.

Examples

Three.js

Atmosphere Engine

Spider System

Weather

Particle Systems

Do not initialize features before they become relevant.

---

# Viewport Awareness

If something cannot be seen,

it should not consume resources.

Pause

Particles.

Timelines.

Observers.

Lighting.

Reflection updates.

Outside the viewport.

---

# Idle Optimisation

Idle users require less rendering.

Reduce update frequency.

Maintain atmosphere.

Preserve battery.

Never waste resources.

---

# Background Tab Behaviour

When the tab becomes inactive

Pause

Particles.

Spider.

Weather.

Reflection updates.

Background calculations.

Resume gracefully when focus returns.

---

# Mobile Strategy

Mobile is not Desktop Lite.

Mobile deserves its own optimization strategy.

Reduce

Particles.

Blur.

Shader updates.

Reflection frequency.

Environmental effects.

Keep

Identity.

Motion philosophy.

Content.

Responsiveness.

---

# Battery Awareness

If reduced performance is detected,

gracefully reduce

Atmosphere.

Particles.

Glass updates.

Environmental calculations.

Never reduce usability.

---

# Accessibility First

Reduced motion

must reduce work,

not remove personality.

Replace movement

with

Contrast.

Lighting.

Opacity.

Spacing.

The experience remains premium.

Only the implementation changes.

---

# Network Performance

Load what is necessary.

Nothing more.

Critical assets first.

Decorative assets later.

Never delay meaningful content.

---

# Image Strategy

Every image should justify its size.

Compress aggressively.

Lazy load intelligently.

Avoid oversized assets.

Use modern formats whenever possible.

---

# Font Strategy

Load only required weights.

Avoid unnecessary font families.

Typography should feel fast.

Not heavy.

---

# Asset Philosophy

Every kilobyte must justify itself.

Ask

Does this asset improve the experience enough to deserve being downloaded?

If not,

remove it.

---

# Code Splitting

Every large system should remain independent.

Developer Mode.

Hacker Mode.

Atmosphere.

Spider.

Heavy animations.

Each should load only when needed.

---

# Cleanup Rules

Every component owns

its listeners,

its observers,

its animations,

its timers.

Nothing leaks.

Nothing survives unnecessarily.

Everything cleans itself.

---

# Monitoring

Performance should be measured continuously.

Not assumed.

Monitor

Frame rate.

Memory.

Largest Contentful Paint.

Interaction latency.

Layout Shift.

Bundle size.

Animation cost.

Performance is a product feature.

Track it like one.

---

# Performance During Reading

Reading has highest priority.

Reduce environmental updates.

Reduce lighting changes.

Allow the visitor to focus.

The interface should quietly disappear.

---

# Failure Behaviour

If any advanced effect fails,

the portfolio should continue beautifully.

No blank screens.

No broken layouts.

No missing navigation.

Graceful degradation is premium engineering.

---

# Anti Patterns

Never

Animate layout properties unnecessarily.

Stack expensive filters.

Continuously measure DOM.

Force synchronous layouts.

Create infinite animation loops without reason.

Block scrolling.

Animate dozens of elements simultaneously.

Use expensive effects simply because hardware allows it.

Premium engineering means knowing what **not** to render.

---

# Performance Checklist

Before merging any feature,

ask

Does it preserve 60 FPS?

Does it improve the experience?

Can it degrade gracefully?

Can it pause when unnecessary?

Can it be cleaned up completely?

Can it run on average hardware?

If any answer is "No",

the feature is not production-ready.

---

# Final Principle

Visitors should never notice performance.

They should only notice confidence.

Fast software feels intelligent.

Smooth software feels expensive.

Efficient software feels handcrafted.

Performance is invisible craftsmanship.

That is why it belongs in the Design Bible,

not at the end of development.
