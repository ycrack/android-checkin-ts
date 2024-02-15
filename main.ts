#!/usr/bin/env -S deno run --allow-net
import { parseArgs } from "std/cli/parse_args.ts";
import { Table } from "cliffy/table/mod.ts";
import {
  AndroidCheckinRequest,
  AndroidCheckinProto,
  AndroidBuildProto,
  AndroidCheckinResponse,
} from "./gen/checkin_pb.ts";

const flags = parseArgs(Deno.args, {
  string: ["fingerprint", "model"],
});

async function get_update_url(fingerprint: string, device: string) {
  const req = new AndroidCheckinRequest({
    digest: "",
    version: 3,
    checkin: new AndroidCheckinProto({
      build: new AndroidBuildProto({
        fingerprint,
        timestamp: BigInt(0),
        device,
      }),
    }),
  });

  const res = await fetch("https://android.clients.google.com/checkin", {
    method: "POST",
    body: req.toBinary(),
    headers: {
      "Content-Type": "application/x-protobuf",
    },
  });

  if (res.ok) {
    const decoder = new TextDecoder();
    const result = AndroidCheckinResponse.fromBinary(new Uint8Array(await res.arrayBuffer()))
      .setting.reduce((acc, cur) => {
        const key = decoder.decode(cur.name);
        switch (key) {
          case "update_url": acc.url = decoder.decode(cur.value); break;
          case "update_title": acc.title = decoder.decode(cur.value); break;
          case "update_description": acc.description = decoder.decode(cur.value); break;
        }
        return acc;
      }, {
        fingerprint,
        model: device,
      } as {
        fingerprint: string; model: string;
        title?: string; description?: string; url?: string;
      });
    if (result.url?.length) {
      new Table()
        .header(["name", "value"])
        .body(Object.entries(result))
        .maxColWidth(Deno.consoleSize().columns - 18, true)
        .border()
        .render();
    }
  } else {
    console.error(res.status, res.statusText);
  }
}

if (flags.fingerprint && flags.model) {
  get_update_url(flags.fingerprint, flags.model);
} else {
  console.error("fingerprint and model must be specified.");
}
