import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    // Reemplazar con el número de WhatsApp del club (formato: 549XXXXXXXXXX)
    const phoneNumber = "549XXXXXXXXXX";
    const message = encodeURIComponent("Hola! Me gustaría obtener más información sobre el Club La Victoria.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Pulse animation ring */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75" />
        
        {/* Main button */}
        <div className="relative w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
          <MessageCircle className="text-white" size={32} />
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-foreground text-background px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
        <span className="font-inter font-medium">¿Necesitás ayuda?</span>
        {/* Arrow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-foreground" />
      </div>
    </button>
  );
};

export default WhatsAppButton;
