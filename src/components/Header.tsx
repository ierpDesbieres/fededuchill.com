import React from 'react';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="mb-6">
      <Image
        src="/logo-fuc-2025.png"
        alt="FedEduChill"
        width={400}
        height={200}
        className="mx-auto"
        priority
      />
    </div>
  );
};

export default Header;
