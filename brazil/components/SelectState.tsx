import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectState = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px] text-black">
        <SelectValue placeholder="Choose a state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>State</SelectLabel>
          <SelectItem value="AC">Acre - AC</SelectItem>
          <SelectItem value="AL">Alagoas AL - AL</SelectItem>
          <SelectItem value="AP">Amapá - AP</SelectItem>
          <SelectItem value="AM">Amazonas - AM</SelectItem>
          <SelectItem value="BA">Bahia - BA</SelectItem>
          <SelectItem value="CE">Ceará - CE</SelectItem>
          <SelectItem value="DF">Distrito Federal - DF</SelectItem>
          <SelectItem value="ES">Espírito Santo - ES</SelectItem>
          <SelectItem value="GO">Goiás - GO</SelectItem>
          <SelectItem value="MA">Maranhão - MA</SelectItem>
          <SelectItem value="MT">MatoGrosso - MT</SelectItem>
          <SelectItem value="MS">MatoGrosso do Sul - MS</SelectItem>
          <SelectItem value="PA">Pará - PA</SelectItem>
          <SelectItem value="PB">Paraíba - PB</SelectItem>
          <SelectItem value="PR">Paraná - PR</SelectItem>
          <SelectItem value="PE">Pernambuco - PE</SelectItem>
          <SelectItem value="PI">Piauí - PI</SelectItem>
          <SelectItem value="RJ">Rio de Janeiro - RJ</SelectItem>
          <SelectItem value="RN">Rio Grande do Norte - RN</SelectItem>
          <SelectItem value="RS">Rio Grande do Sul - RS</SelectItem>
          <SelectItem value="RO">Rondônia - RO</SelectItem>
          <SelectItem value="RR">Roraima - RR</SelectItem>
          <SelectItem value="SC">Santa Catarina - SC</SelectItem>
          <SelectItem value="SP">São Paulo - SP</SelectItem>
          <SelectItem value="SE">Sergipe - SE</SelectItem>
          <SelectItem value="TO">Tocantins - TO</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectState;
