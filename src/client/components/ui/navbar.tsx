"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/client/components/ui/navigation-menu";

const cadastros = [
  {
    title: "Fornecedores",
    href: "/suppliers",
  },
  {
    title: "Tipo de licitacão",
    href: "/biddingtypes",
  },
];

export function Navbar() {
  return (
    <NavigationMenu className="flex-1 space-x-2 mx-6">
      <NavigationMenuItem>
        <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="">
            {cadastros.map((item) => {
              return (
                <NavigationMenuItem key={item.title}>
                  <Link className="" href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="">
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/contracts" legacyBehavior passHref>
            <NavigationMenuLink className="w-full">
              Contratos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
