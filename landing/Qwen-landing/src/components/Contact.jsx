import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Form submission logic would go here
      console.log('Form submitted:', formData);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section ref={sectionRef} className="bg-paper px-6 py-32 relative overflow-hidden" id="contact">
      {/* Thick divider */}
      <div className="absolute top-0 left-0 w-full thick-divider" />

      {/* Rotating degree symbol */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display text-[600px] text-ink opacity-[0.04]"
          style={{ animation: 'rotate 120s linear infinite' }}
        >
          °
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-16 relative z-10">
        {/* Left: Heading */}
        <div className="col-span-7">
          <h2
            ref={headingRef}
            className="font-display text-ink leading-none"
            style={{ fontSize: 'clamp(80px, 12vw, 180px)' }}
          >
            Let's talk.
          </h2>
        </div>

        {/* Right: Form */}
        <div ref={formRef} className="col-span-5">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="YOUR NAME"
                className={`w-full bg-transparent border-b-2 ${
                  errors.name ? 'border-vermillion' : 'border-ink'
                } py-3 font-mono text-sm placeholder-ash focus:outline-none focus:border-acid transition-colors`}
              />
              {errors.name && (
                <p className="font-mono text-[10px] text-vermillion mt-2">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="YOUR EMAIL"
                className={`w-full bg-transparent border-b-2 ${
                  errors.email ? 'border-vermillion' : 'border-ink'
                } py-3 font-mono text-sm placeholder-ash focus:outline-none focus:border-acid transition-colors`}
              />
              {errors.email && (
                <p className="font-mono text-[10px] text-vermillion mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="YOUR MESSAGE"
                rows={3}
                className={`w-full bg-transparent border-b-2 ${
                  errors.message ? 'border-vermillion' : 'border-ink'
                } py-3 font-mono text-sm placeholder-ash focus:outline-none focus:border-acid transition-colors resize-none`}
              />
              {errors.message && (
                <p className="font-mono text-[10px] text-vermillion mt-2">{errors.message}</p>
              )}
            </div>

            <button
              ref={buttonRef}
              type="submit"
              className="w-full bg-acid text-ink font-mono text-sm tracking-system py-4 hover:bg-ink hover:text-acid transition-all duration-400 cursor-pointer"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;
