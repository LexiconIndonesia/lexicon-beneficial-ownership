import React from 'react'

export default function AboutPage (): React.ReactElement {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            About Lexicon Beneficial Ownership
          </h1>
          <p className="mb-4">
            At <strong>Lexicon Beneficial Ownership</strong>, we are committed
            to revolutionizing the way businesses and organizations manage and
            understand ownership structures. Our mission is to bring
            transparency, efficiency, and compliance to the often-complex world
            of Beneficial ownership, helping businesses navigate regulatory
            requirements with ease.
          </p>
          <p className="mb-4">
            Founded in 2023, Lexicon Beneficial Ownership was established to
            tackle the growing need for clear, accessible information in
            corporate governance and compliance. We offer innovative solutions
            that simplify ownership tracking and ensure that our clients remain
            compliant with both local and international regulations.
          </p>
          <p className="mb-4">
            Our expert team, with deep experience in legal, regulatory, and
            financial services, is driven by a passion for simplifying
            complexity. By leveraging cutting-edge technology, we provide a
            seamless platform that offers clarity and actionable insights into
            ownership structures.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="mb-4">
            To provide businesses with the tools and knowledge they need to
            navigate Beneficial ownership transparently and efficiently.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="mb-4">
            To be the leading platform for Beneficial ownership management,
            setting the standard for transparency and compliance in corporate
            governance.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">
              Transparency: We believe in clear, accessible information that
              empowers businesses.
            </li>
            <li className="mb-2">
              Innovation: We constantly push the boundaries to offer
              cutting-edge solutions.
            </li>
            <li className="mb-2">
              Integrity: We are committed to ethical practices and building
              trust with our clients.
            </li>
            <li className="mb-2">
              Customer-Centric: Our clients are at the heart of everything we
              do, and we strive to meet their unique needs.
            </li>
          </ul>
          <h2 className="text-2xl font-bold mb-4 mt-4">
            Find out more about us
          </h2>
          <p className="mb-4">
            Checkout this link{' '}
            <a
              target="_blank"
              className="text-blue-700 hover:opacity-80 transition-all duration-200"
              href="https://accountabilitylab.org/anti-corruption-technologists-in-indonesia-use-tool-to-flag-fraudulent-entities/" rel="noreferrer"
            >
              https://accountabilitylab.org/anti-corruption-technologists-in-indonesia-use-tool-to-flag-fraudulent-entities/
            </a>{' '}
            to see how we build Lexicon Beneficial Ownership
          </p>
        </div>
      </div>
    </div>
  )
}
