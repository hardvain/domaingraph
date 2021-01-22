import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  HStack,
  useDisclosure,
  Tag,
  Collapse,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
const f = (a, b) => [].concat(...a.map((d) => b.map((e) => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);
const Combination = ({ values = [] }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box p={2} w="100%" border="1px solid rgba(0,0,0,0.1)">
      <HStack my={2}>
        <IconButton
          onClick={onToggle}
          size="sm"
          icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        />
        {typeof values.map((v) => <Tag key={v}>{v}</Tag>)}
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        <VStack alignItems="baseline">
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea rows={5} />
          </FormControl>

          <Button>Submit</Button>
        </VStack>
      </Collapse>
    </Box>
  );
};
const NewFlow = () => {
  const [dimensions, setDimensions] = useState([]);
  const [values, setValues] = useState([]);
  const [currentValue, setCurrentValue] = useState("");
  const [name, setName] = useState("");
  const updateValue = (value, index) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };
  const addValue = () => {
    setValues([...values, currentValue]);
    setCurrentValue("");
  };
  const addDimension = () => {
    const result = [...dimensions, { name, values }];
    setDimensions(result);
    setValues([]);
    setCurrentValue("");
    setName("");
    localStorage.setItem("dimensions", JSON.stringify(result));
  };
  const combinations =
    cartesian(
      ...dimensions.map((d) => d.values.map((v) => `${d.name}=${v}`))
    ) || [];
  const flatenedCombinations = combinations.map((c) => {
    if (typeof c === "string") {
      return [c];
    } else {
      return c;
    }
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dimensionsFromDb = localStorage.getItem("dimensions");
      setDimensions(dimensionsFromDb ? JSON.parse(dimensionsFromDb) : []);
    }
  }, []);
  return (
    <Box p={5}>
      <VStack p={10} alignItems="baseline" spacing={20}>
        <VStack alignItems="baseline" w="100%">
          {dimensions.map((d, i) => (
            <Box key={i} p={2} w="100%" border="1px solid rgba(0,0,0,0.1)">
              <VStack alignItems="baseline">
                <Heading fontSize="xl">{d.name}</Heading>
                <HStack>
                  {d.values.map((v) => (
                    <Tag key={v}>{v}</Tag>
                  ))}
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
        <Box p={5} w="100%" border="1px solid rgba(0,0,0,0.1)">
          <form>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            {values.map((v, i) => (
              <Input
                key={i}
                value={v}
                onChange={(e) => updateValue(e.target.value, i)}
              />
            ))}
            <FormControl id="name" my={2}>
              <FormLabel>Values</FormLabel>
              <Input
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </FormControl>
            <Button onClick={addValue}>Add Value</Button>
          </form>
        </Box>
        <Button onClick={addDimension}>Add Dimension</Button>
      </VStack>

      <Box my={2}>
        <VStack>
          {flatenedCombinations.map((c, i) => (
            <Combination values={c} key={i} />
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default NewFlow;
