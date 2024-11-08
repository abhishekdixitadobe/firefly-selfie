// src/components/Header.js
import React, { useEffect, useState } from "react";
import {
  Flex,
  View,
  Link as SpectrumLink,
  Image,
  Heading,
  Button,
  Text
} from "@adobe/react-spectrum";
import AppLogo from "./logo.svg";
import ChevronLeft from "@spectrum-icons/workflow/ChevronLeft";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  return (
    <View backgroundColor="gray-50" paddingX="size-300" paddingY="size-200">
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Flex direction="row" alignItems="center" gap="size-200">
          <SpectrumLink>
            <Link to="/">
              <Image src={AppLogo} height="size-400" alt="DragonFly Logo" />
            </Link>
          </SpectrumLink>
          <Heading level={3} marginStart="size-200">Firefly Selfie Studio</Heading>
        </Flex>
      </Flex>
    </View>
  );
};

export default Header;
