"use client";
import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectSH2Props {
  setSH2: (selectedSH2: string) => void;
}

export function SelectSH2({ setSH2 }: SelectSH2Props) {
  return (
    <Select defaultValue="-1" onValueChange={(choice) => setSH2(choice)}>
      <SelectTrigger className="w-[25rem] text-black ">
        <SelectValue placeholder="Choose a SH2 Code" />
      </SelectTrigger>
      <SelectContent className="overflow-y-auto max-h-60">
        <SelectGroup>
          <SelectLabel>SH2 Code</SelectLabel>
          <SelectItem value="-1">Show all Codes</SelectItem>
          <SelectItem value="1">1 - Live animals</SelectItem>
          <SelectItem value="2">2 - Meat and edible meat offal</SelectItem>
          <SelectItem value="3">
            3 - Fish and crustaceans, molluscs and other aquatic invertebrates
          </SelectItem>
          <SelectItem value="4">
            4 - Dairy produce; birds' eggs; natural honey; others
          </SelectItem>
          <SelectItem value="5">
            5 - Products of animal origin, not specified or included elsewhere
          </SelectItem>
          <SelectItem value="6">
            6 - Live trees and other plants; others
          </SelectItem>
          <SelectItem value="7">
            7 - Edible vegetables and certain roots and tubers
          </SelectItem>
          <SelectItem value="8">
            8 - Edible fruit and nuts; peel of citrus fruits or melons
          </SelectItem>
          <SelectItem value="9">9 - Coffee, tea, maté and spices</SelectItem>
          <SelectItem value="10">10 - Cereals</SelectItem>
          <SelectItem value="11">
            11 - Products of the milling industry; Malt; Starches; Inulin; Wheat
            gluten
          </SelectItem>
          <SelectItem value="12">
            12 - Oil seeds and oleaginous fruits; Grains, Seeds, others
          </SelectItem>
          <SelectItem value="13">
            13 - Lac; gums, resins and other vegetable saps and extracts
          </SelectItem>
          <SelectItem value="14">
            14 - Vegetable plaiting materials; Vegetable products not elsewhere
            specified or included
          </SelectItem>
          <SelectItem value="15">
            15 - Animal or vegetable fats and oils; Others
          </SelectItem>
          <SelectItem value="16">
            16 - Preparations of meat, of fish or of crustaceans, others
          </SelectItem>
          <SelectItem value="17">
            17 - Sugars and sugar confectionery
          </SelectItem>
          <SelectItem value="18">18 - Cocoa and cocoa preparations</SelectItem>
          <SelectItem value="19">
            19 - Preparations of cereals, flour, starch or milk; pastrycooks'
            products
          </SelectItem>
          <SelectItem value="20">
            20 - Preparations of vegetables, fruit, nuts or other parts of
            plants
          </SelectItem>
          <SelectItem value="21">
            21 - Miscellaneous edible preparations
          </SelectItem>
          <SelectItem value="22">
            22 - Beverages, spirits and vinegar
          </SelectItem>
          <SelectItem value="23">
            23 - Residues and waste from the food industries; others
          </SelectItem>
          <SelectItem value="24">
            24 - Tobacco and manufactured tobacco substitutes
          </SelectItem>
          <SelectItem value="25">
            25 - Salt; sulphur; earths and stone; plastering materials, lime and
            cement
          </SelectItem>
          <SelectItem value="26">26 - Ores, slag and ash</SelectItem>
          <SelectItem value="27">
            27 - Mineral fuels, mineral oils, bituminous substances; mineral
            waxes
          </SelectItem>
          <SelectItem value="28">
            28 - Inorganic chemicals; organic or inorganic compounds of precious
            metals, others
          </SelectItem>
          <SelectItem value="29">29 - Organic chemicals</SelectItem>
          <SelectItem value="30">30 - Pharmaceutical products</SelectItem>
          <SelectItem value="31">31 - Fertilisers</SelectItem>
          <SelectItem value="32">
            32 - Tanning or dyeing extracts; tannins and their derivatives;
            others
          </SelectItem>
          <SelectItem value="33">
            33 - Essential oils and resinoids; perfumery, cosmetic or toilet
            preparations
          </SelectItem>
          <SelectItem value="34">
            34 - Soap, organic surface-active agents, others
          </SelectItem>
          <SelectItem value="35">
            35 - Albuminoidal substances; modified starches; glues; enzymes
          </SelectItem>
          <SelectItem value="36">
            36 - Explosives; pyrotechnic products; matches; others
          </SelectItem>
          <SelectItem value="37">
            37 - Photographic or cinematographic goods
          </SelectItem>
          <SelectItem value="38">
            38 - Miscellaneous chemical products
          </SelectItem>
          <SelectItem value="39">39 - Plastics and articles thereof</SelectItem>
          <SelectItem value="40">40 - Rubber and articles thereof</SelectItem>
          <SelectItem value="41">
            41 - Raw hides and skins (other than furskins) and leather
          </SelectItem>
          <SelectItem value="42">
            42 - Articles of leather; articles of animal gut (other than
            silkworm gut), others
          </SelectItem>
          <SelectItem value="43">
            43 - Furskins and artificial fur; manufactures thereof
          </SelectItem>
          <SelectItem value="44">
            44 - Wood and articles of wood; wood charcoal
          </SelectItem>
          <SelectItem value="45">45 - Cork and articles of cork</SelectItem>
          <SelectItem value="46">
            46 - Manufactures of straw, of esparto or of other plaiting
            materials{" "}
          </SelectItem>
          <SelectItem value="47">
            47 - Pulp of wood or of other fibrous cellulosic material, others,
          </SelectItem>
          <SelectItem value="48">
            48 - Paper and paperboard; articles of paper pulp, of paper or of
            paperboard
          </SelectItem>
          <SelectItem value="49">
            49 - Books, newspapers, pictures and other products of the printing
            industry; others
          </SelectItem>
          <SelectItem value="50">50 - Silk</SelectItem>
          <SelectItem value="51">
            51 - Wool, fine or coarse animal hair; horsehair yarn and woven
            fabric
          </SelectItem>
          <SelectItem value="52">52 - Cotton</SelectItem>
          <SelectItem value="53">
            53 - Other vegetable textile fibres; paper yarn and woven fabrics of
            paper yarn
          </SelectItem>
          <SelectItem value="54">54 - Man-made filaments</SelectItem>
          <SelectItem value="55">55 - Man-made staple fibres</SelectItem>
          <SelectItem value="56">
            56 - Wadding, felt and nonwovens; others
          </SelectItem>
          <SelectItem value="57">
            57 - Carpets and other textile floor coverings
          </SelectItem>
          <SelectItem value="58">
            58 - Special woven fabrics; tufted textile fabrics; lace;
            tapestries; others
          </SelectItem>
          <SelectItem value="59">
            59 - Impregnated, coated, covered or laminated textile fabrics;
            others
          </SelectItem>
          <SelectItem value="60">60 - Lnitted or crocheted fabrics</SelectItem>
          <SelectItem value="61">
            61 - Articles of apparel and clothing accessories, knitted or
            crocheted
          </SelectItem>
          <SelectItem value="62">
            62 - Articles of apparel and clothing accessories, not knitted or
            crocheted
          </SelectItem>
          <SelectItem value="63">
            63 - Other made-up textile articles; sets; rags, others
          </SelectItem>
          <SelectItem value="64">
            64 - Footwear, gaiters and the like; parts of such articles
          </SelectItem>
          <SelectItem value="65">65 - Headgear and parts thereof</SelectItem>
          <SelectItem value="66">
            66 - Umbrellas, sun umbrellas, walking-sticks, seat-sticks, whips,
            riding-crops, others
          </SelectItem>
          <SelectItem value="67">
            67 - Prepared feathers and articles made of feathers or of down;
            others
          </SelectItem>
          <SelectItem value="68">
            68 - Articles of stone, plaster, cement, asbestos, mica or similar
            materials
          </SelectItem>
          <SelectItem value="69">69 - Ceramic products</SelectItem>
          <SelectItem value="70">70 - Glass and glassware</SelectItem>
          <SelectItem value="71">
            71 - Natural or cultured pearls, precious or semi-precious stones,
            others
          </SelectItem>
          <SelectItem value="72">72 - Iron and steel</SelectItem>
          <SelectItem value="73">73 - Articles of iron or steel</SelectItem>
          <SelectItem value="74">74 - Copper and articles thereof</SelectItem>
          <SelectItem value="75">75 - Nickel and articles thereof</SelectItem>
          <SelectItem value="76">
            76 - Aluminium and articles thereof
          </SelectItem>
          <SelectItem value="78">78 - Lead and articles thereof</SelectItem>
          <SelectItem value="79">79 - Zinc and articles thereof</SelectItem>
          <SelectItem value="80">80 - Tin and articles thereof</SelectItem>
          <SelectItem value="81">
            81 - Other base metals; cermets; articles thereof
          </SelectItem>
          <SelectItem value="82">
            82 - Tools, implements, cutlery, spoons and forks, of base metal;
            parts thereof of base metal
          </SelectItem>
          <SelectItem value="83">
            83 - Miscellaneous articles of base metal
          </SelectItem>
          <SelectItem value="84">
            84 - Nuclear reactors, boilers, machinery and mechanical appliances;
            others
          </SelectItem>
          <SelectItem value="85">
            85 - Electrical machinery and equipment and parts thereof; others
          </SelectItem>
          <SelectItem value="86">
            86 - Railway or tramway locomotives, rolling-stock and parts
            thereof; others
          </SelectItem>
          <SelectItem value="87">
            87 - Vehicles other than railway or tramway rolling-stock, and parts
            and accessories thereof
          </SelectItem>
          <SelectItem value="88">
            88 - Aircraft, spacecraft, and parts thereof
          </SelectItem>
          <SelectItem value="89">
            89 - Ships, boats and floating structures
          </SelectItem>
          <SelectItem value="90">
            90 - Optical, photographic, cinematographic instruments; others
          </SelectItem>
          <SelectItem value="91">
            91 - Clocks and watches and parts thereof
          </SelectItem>
          <SelectItem value="92">
            92 - Musical instruments; parts and accessories of such articles
          </SelectItem>
          <SelectItem value="93">
            93 - Arms and ammunition; parts and accessories thereof
          </SelectItem>
          <SelectItem value="94">
            94 - Furniture; bedding, mattresses, cushions and similar stuffed
            furnishings; others
          </SelectItem>
          <SelectItem value="95">
            95 - Toys, games and sports requisites; parts and accessories
            thereof
          </SelectItem>
          <SelectItem value="96">
            96 - Miscellaneous manufactured articles
          </SelectItem>
          <SelectItem value="97">
            97 - Works of art, collectors' pieces and antiques
          </SelectItem>
          <SelectItem value="99">99 - Special operation</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
