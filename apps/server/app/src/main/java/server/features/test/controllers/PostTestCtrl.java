package server.features.test.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import server.decorators.flow.ErrAPI;
import server.decorators.flow.api.Api;
import server.decorators.flow.res_api.ResAPI;
import server.features.test.services.PostFormSvc;
import server.lib.data_structure.LibShape;

@Component
@RequiredArgsConstructor
public class PostTestCtrl {
    private final PostFormSvc postFormSvc;

    public Mono<ResponseEntity<ResAPI>> postMsg(Api api) {
        return api.getBd(new TypeReference<Map<String, Object>>() {
        }).flatMap(bd -> {
            var msg = (String) bd.get("msg");

            if (!LibShape.hasText(msg))
                return new ResAPI(400).msg("missing msg").build();

            return new ResAPI(200).msg("msg received").data(Map.of("clientMsg", msg)).build();
        }).switchIfEmpty(Mono.error(new ErrAPI("missing msg", 400)));
    }

    public Mono<ResponseEntity<ResAPI>> postFormData(Api api) {
        return postFormSvc.postForm(api).flatMap(tpl -> {
            return new ResAPI(200).msg(
                    "form parsed • processed • saved locally • uploaded on cloud • deleted locally • deleted from cloud")
                    .data(Map.of("saved", tpl.getT1(), "deleted", tpl.getT2())).build();
        });

    }

}
