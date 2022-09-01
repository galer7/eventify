import { trpc } from "@/utils/trpc";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function SetPhone() {
  const router = useRouter();
  interface FormElements extends HTMLFormControlsCollection {
    prefix: HTMLInputElement;
    phone: HTMLInputElement;
  }

  interface YourFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const addPhoneMutation = trpc.useMutation("user.add-phone");
  return (
    <div className="text-center">
      <div className="text-3xl mt-10">Setup phone number</div>
      <div className="flex">
        <form
          className="flex m-auto gap-4 items-center mt-10"
          action=""
          autoComplete="off"
          onSubmit={(e: React.FormEvent<YourFormElement>) =>
            addPhoneMutation.mutate(
              {
                phone: e.currentTarget.elements.phone.value,
              },
              {
                onSuccess() {
                  router.push("/events");
                },
              }
            )
          }
        >
          <fieldset
            disabled={addPhoneMutation.isLoading}
            className="flex justify-center items-center gap-10"
          >
            <label className="flex flex-col items-center gap-2 justify-around text-center text-xl">
              Prefix
              <input
                type="text"
                id="prefix"
                className="border-black border-2 text-black"
                autoFocus
              />
            </label>
          </fieldset>

          <fieldset
            disabled={addPhoneMutation.isLoading}
            className="flex justify-center items-center gap-10"
          >
            <label className="flex flex-col items-center gap-2 justify-around text-center text-xl">
              Phone number
              <input
                type="text"
                id="phone"
                className="border-black border-2 text-black"
              />
            </label>
          </fieldset>

          <input
            type="button"
            value="Submit"
            className="border-8 bg-green-600 rounded-lg border-green-600"
          />
        </form>
      </div>
      <div>
        <div>
          {"Don't worry, you can always set it up later on the main page"}
        </div>
        <Link href="/events">
          <a className="border-8 border-yellow-200 bg-yellow-200">
            Skip for now
          </a>
        </Link>
      </div>
    </div>
  );
}

export default SetPhone;
