# Project: AV Display Calculator

## Objective

Create a modern web application for AV system integrators that helps sales engineers and presales teams calculate display configurations and recommend suitable hardware.

The application should be responsive, clean, and easy to use.

---

## Technology Stack

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons

The project must use reusable components and clean folder structures.

---

# Module 1 - LCD Video Wall Calculator

### User Inputs

* Panel Size

  * 46"
  * 49"
  * 55"
  * 65"

* Panel Resolution

  * 1920 x 1080
  * 3840 x 2160

* Bezel Size

  * 0.88 mm
  * 1.7 mm
  * 3.5 mm
  * Custom

* Layout

  * Horizontal Panels
  * Vertical Panels

Example:

3 x 3

4 x 4

5 x 3

etc.

---

## Calculations

Calculate:

* Total Width
* Total Height
* Overall Resolution
* Aspect Ratio
* Total Number of Panels

---

## Validation

Detect when the layout aspect ratio differs significantly from the source content aspect ratio.

Display a warning such as:

"Content may be stretched or scaled due to aspect ratio mismatch."

---

## Result Cards

Display:

* Physical Size
* Resolution
* Aspect Ratio
* Total Panels

---

# Module 2 - LED Display Calculator

Inputs:

* Pixel Pitch
* Cabinet Size
* Cabinet Count (Horizontal x Vertical)
* Indoor / Outdoor

Calculate:

* Physical Width
* Physical Height
* Native Resolution
* Total Pixels
* Aspect Ratio

---

# Module 3 - Meeting Room Recommendation

Inputs

* Room Width
* Room Length
* Number of Users
* Use Case

Options

* Presentation
* Monitoring
* Control Room
* Training Room

Output

Recommended Display Type

Recommended Screen Size

Recommended Resolution

Recommended Viewing Distance

---

# UI Requirements

The UI should look like a modern SaaS dashboard.

Requirements:

* Sidebar navigation
* Responsive design
* Light/Dark Mode
* Cards
* Icons
* Clean spacing
* Professional AV industry appearance

---

# Code Quality

Use:

* TypeScript
* Reusable components
* Utility functions
* Custom hooks where appropriate
* Modular architecture

No duplicated code.

---

# Future Ready

The architecture should make it easy to add:

* AI Recommendation
* Export PDF
* Save Projects
* Product Database
* Video Processor Recommendation
* User Login

These features do not need to be implemented yet but the architecture should support them.
