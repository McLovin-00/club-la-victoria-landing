import React from "react";

const SmallSpinner = () => (
  <div role="status" className="flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Cargando...</span>
  </div>
);

export default SmallSpinner;
